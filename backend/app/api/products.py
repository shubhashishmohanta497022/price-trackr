from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.product_schema import Product, ProductCreate, ProductUpdate, ProductWithPriceHistory
from app.crud import products as crud_products
from app.crud import prices as crud_prices

router = APIRouter()

@router.get("/", response_model=List[Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud_products.get_products(db, skip=skip, limit=limit)
    return products

@router.post("/", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    # For now, using user_id = 1 as default
    # In real implementation, this would come from authentication
    return crud_products.create_product(db=db, product=product, user_id=1)

@router.get("/{product_id}", response_model=ProductWithPriceHistory)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud_products.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    # Get price history
    price_logs = crud_prices.get_price_logs(db, product_id=product_id, limit=50)
    db_product.price_logs = price_logs

    return db_product

@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate, db: Session = Depends(get_db)):
    db_product = crud_products.update_product(db, product_id=product_id, product_update=product_update)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    if not crud_products.delete_product(db, product_id=product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.get("/{product_id}/price-history")
def get_product_price_history(product_id: int, limit: int = 50, db: Session = Depends(get_db)):
    price_logs = crud_products.get_product_price_history(db, product_id=product_id, limit=limit)
    return price_logs
