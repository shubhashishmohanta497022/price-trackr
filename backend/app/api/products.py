from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Response, status
from sqlalchemy.orm import Session
from typing import List
from redis import Redis
from rq import Queue

from .. import crud
from ..schemas import product_schema, price_schema
from ..database import get_db
from ..config import settings
# A placeholder for the actual worker task function
# from ..services.scraper_sync import queue_scrape_task 

# --- A placeholder for the real task queuing function ---
# In a real setup, this might live in `services/scraper_sync.py`
# For now, we define it here for simplicity.
def queue_scrape_task(product_id: int):
    """
    Connects to Redis and enqueues a scraping task for the worker.
    """
    try:
        # NOTE: This connection should ideally be managed more globally
        redis_conn = Redis(
            host=settings.REDIS_HOST, 
            port=settings.REDIS_PORT, 
            password=settings.REDIS_PASSWORD
        )
        q = Queue('scraping_tasks', connection=redis_conn)
        q.enqueue('playwright_scraper.runner.scrape_product_by_id', product_id)
        print(f"Successfully queued scrape task for product_id: {product_id}")
    except Exception as e:
        # In a real app, you would have more robust logging here
        print(f"Error connecting to Redis or enqueuing task: {e}")
# --- End of placeholder ---


router = APIRouter()

@router.post("/track", response_model=product_schema.Product, status_code=status.HTTP_202_ACCEPTED)
def track_new_product(
    product_request: product_schema.ProductTrackRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Accepts a product URL to track.

    - If the product URL is already in the database, it returns the existing product.
    - If it's a new URL, it creates a placeholder product.
    - In both cases, it adds a scraping job to the background queue to fetch/update
      the product's details and price.
    """
    # Use a CRUD helper to either get the existing product or create a new one.
    # We create a placeholder here. The worker will fill in the details.
    placeholder_data = product_schema.ProductCreate(
        url=str(product_request.url),
        title=f"Tracking new product from {product_request.url.host}...",
        # Other fields can be None/default initially
    )
    db_product = crud.products.get_or_create_product(db, product_data=placeholder_data)
    
    # Add the scraping task to run in the background.
    # This ensures the API can respond immediately.
    background_tasks.add_task(queue_scrape_task, db_product.id)
    
    return db_product

@router.get("/", response_model=List[product_schema.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of all tracked products with pagination.
    """
    products = crud.products.get_products(db, skip=skip, limit=limit)
    return products

@router.get("/{product_id}", response_model=product_schema.ProductWithHistory)
def read_product(product_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single product by its ID, including its full price history.
    """
    db_product = crud.products.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Manually attach price history for the response model
    db_product.price_history = crud.prices.get_price_logs_for_product(db, product_id=product_id)
    return db_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Delete a tracked product and all of its associated data.
    """
    db_product = crud.products.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

