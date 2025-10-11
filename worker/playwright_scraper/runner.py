import os, json, time
import redis
from rq import Connection, Queue, Worker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
from .scrapers.amazon import scrape as scrape_amazon
from .scrapers.flipkart import scrape as scrape_flipkart

DB_URL = os.getenv("DATABASE_URL")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
engine = create_engine(DB_URL, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, future=True, autoflush=False, autocommit=False)

def pick_scraper(url: str):
    if "amazon." in url:
        return scrape_amazon
    if "flipkart." in url:
        return scrape_flipkart
    return None

def scrape_product_source(product_source_id: int, url: str):
    scraper = pick_scraper(url)
    if not scraper:
        return None
    data = scraper(url)
    if not data:
        return None
    from sqlalchemy import insert, select
    from ..backend_alias import PriceHistory, ProductSource, Product, Source  # see note below

    db = SessionLocal()
    try:
        ps = db.execute(select(ProductSource).where(ProductSource.id == product_source_id)).scalar_one()
        # update product title if 'Pending scrape'
        prod = db.get(Product, ps.product_id)
        if prod and prod.title == "Pending scrape" and data.get("title"):
            prod.title = data["title"]

        db.execute(insert(PriceHistory).values(
            product_source_id=product_source_id,
            price_cents=data["price"],
            currency=data.get("currency","INR"),
            availability=data.get("availability"),
            scraped_at=datetime.now(timezone.utc)
        ))
        db.commit()

        # publish update
        r = redis.from_url(REDIS_URL)
        payload = json.dumps({
            "event": "price.update",
            "product_id": ps.product_id,
            "price_cents": data["price"],
            "currency": data.get("currency","INR"),
            "scraped_at": datetime.now(timezone.utc).isoformat()
        })
        r.publish("price.update", payload)
    finally:
        db.close()

if __name__ == "__main__":
    # lightweight import alias so worker can access ORM models without circular import:
    # create a file worker/backend_alias.py that imports models from backend mount if you mount same codebase
    # In this PoC, assume worker copies models (or mount backend/app into worker)
    redis_conn = redis.from_url(REDIS_URL)
    with Connection(redis_conn):
        q = Queue("scrape_default")
        worker = Worker([q])
        worker.work()
