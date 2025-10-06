import os
import sys
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright
from redis import Redis
from rq import Connection, Worker

# --- Path Setup ---
# This ensures that the script can import modules from the parent directory,
# which is necessary to access the backend's database session and models.
# This is a common pattern for standalone scripts within a larger project.
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# It's important to import database and CRUD functions *after* setting the path.
from backend.app.database import SessionLocal
from backend.app.config import settings
from backend.app.crud import products as crud_products, prices as crud_prices
from backend.app.schemas import price_schema

# --- Scraper Mapping ---
# Import all your site-specific scraper classes.
from .scrapers.amazon import AmazonScraper
from .scrapers.flipkart import FlipkartScraper
# from .scrapers.myntra import MyntraScraper # etc.

# This dictionary maps a domain name to the corresponding scraper class.
# The runner uses this to dynamically choose the correct scraper for a given URL.
SCRAPER_MAPPING = {
    'www.amazon.in': AmazonScraper,
    'www.flipkart.com': FlipkartScraper,
    # 'www.myntra.com': MyntraScraper,
}

def get_scraper_class(url: str):
    """
    Determines which scraper class to use based on the URL's domain.
    """
    domain = urlparse(url).netloc
    return SCRAPER_MAPPING.get(domain)

def scrape_product_by_id(product_id: int):
    """
    This is the main job function that the RQ worker will execute.
    
    It fetches a product from the database, launches a browser, runs the
    appropriate scraper, and saves the resulting price data.
    """
    print(f"--- Starting scrape job for Product ID: {product_id} ---")
    db = SessionLocal()
    try:
        product = crud_products.get_product(db, product_id)
        if not product:
            print(f"Product with ID {product_id} not found. Aborting job.")
            return

        ScraperClass = get_scraper_class(product.url)
        if not ScraperClass:
            print(f"No scraper found for domain of URL: {product.url}. Aborting job.")
            return

        with sync_playwright() as p:
            # Launch a new headless Chromium browser for each job.
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            # Instantiate and run the chosen scraper
            scraper = ScraperClass(page, product.url)
            scraped_data = scraper.scrape()
            
            browser.close()

            if scraped_data:
                # If scraping was successful, create a new price log entry.
                price_log_data = price_schema.PriceLogCreate(
                    price_cents=scraped_data.price_cents,
                    currency=scraped_data.currency,
                    availability=scraped_data.availability
                )
                crud_prices.create_price_log(db, price=price_log_data, product_id=product.id)
                print(f"Successfully saved new price for Product ID: {product_id}")
                
                # Here, you would also update the product details (title, image, etc.)
                # if they have changed since the last scrape.
            else:
                print(f"Scraping failed for Product ID: {product_id}")

    except Exception as e:
        print(f"An error occurred in scrape_product_by_id for Product ID {product_id}: {e}")
    finally:
        db.close()
        print(f"--- Finished scrape job for Product ID: {product_id} ---")


if __name__ == '__main__':
    # This block runs when the script is executed directly (e.g., `python runner.py`).
    # It sets up the RQ worker to listen for jobs on the specified queues.
    
    # The list of queues this worker will listen to.
    listen = ['scraping_tasks']

    # Establish a connection to the Redis server using settings from the config.
    redis_conn = Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        password=settings.REDIS_PASSWORD
    )

    # The `with Connection(...)` block makes the Redis connection available
    # to the Worker instance.
    with Connection(redis_conn):
        worker = Worker(map(str, listen))
        print(f"Worker listening on queues: {', '.join(listen)}")
        # The `worker.work()` method starts the main loop, where the worker
        # waits for and executes jobs from the queue.
        worker.work()
