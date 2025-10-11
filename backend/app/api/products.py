from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from urllib.parse import urlparse
from ..database import SessionLocal
from ..models.product import Product, Source, ProductSource, PriceHistory
from ..schemas.product_schema import TrackRequest, ProductOut, PricePoint
import re
import json
import redis, os
from rq import Queue

router = APIRouter(prefix="/api")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def norm_domain(url: str) -> str:
    p = urlparse(url)
    return re.sub(r"^www\\.", "", p.netloc.lower())

@router.post("/track")
def track(req: TrackRequest, db: Session = Depends(get_db)):
    domain = norm_domain(str(req.url))
    site_name = domain.split(".")[0].title()

    source = db.query(Source).filter_by(domain=domain).one_or_none()
    if not source:
        source = Source(domain=domain, site_name=site_name, trust_score=50)
        db.add(source); db.flush()

    # Try to reuse product by matching normalized title later; for MVP create shell
    product = Product(title="Pending scrape", brand=None, sku=None)
    db.add(product); db.flush()

    ps = ProductSource(product_id=product.id, source_id=source.id, url=str(req.url))
    db.add(ps); db.commit()

    r = redis.from_url(os.getenv("REDIS_URL", "redis://redis:6379/0"))
    q = Queue("scrape_default", connection=r)
    q.enqueue("playwright_scraper.runner.scrape_product_source", ps.id, ps.url)

    return {"product_id": product.id, "queued": True}

@router.get("/product/{product_id}", response_model=ProductOut)
def product(product_id: int, db: Session = Depends(get_db)):
    p = db.get(Product, product_id)
    if not p:
        raise HTTPException(404, "Product not found")
    # lowest price across sources
    subq = db.query(PriceHistory.price_cents, PriceHistory.currency)\
             .join(ProductSource, ProductSource.id == PriceHistory.product_source_id)\
             .filter(ProductSource.product_id == product_id)\
             .order_by(PriceHistory.price_cents.asc()).first()
    lowest_price_cents, currency = (subq[0], subq[1]) if subq else (None, "INR")
    return ProductOut(id=p.id, title=p.title, brand=p.brand, lowest_price_cents=lowest_price_cents, currency=currency)

@router.get("/product/{product_id}/history", response_model=list[PricePoint])
def history(product_id: int, db: Session = Depends(get_db)):
    rows = db.query(PriceHistory)\
        .join(ProductSource, ProductSource.id == PriceHistory.product_source_id)\
        .filter(ProductSource.product_id == product_id)\
        .order_by(PriceHistory.scraped_at.asc()).all()
    return [
        PricePoint(price_cents=r.price_cents, currency=r.currency, availability=r.availability, scraped_at=r.scraped_at)
        for r in rows
    ]
