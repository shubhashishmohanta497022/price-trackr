from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from .. import models
from ..schemas import price_schema

def create_price_log(db: Session, price: price_schema.PriceLogCreate, product_id: int) -> models.PriceLog:
    """
    Creates a new price log entry for a specific product.

    This function is typically called by the scraper worker after it has
    successfully fetched new price information for a product.

    Args:
        db: The SQLAlchemy database session.
        price: A Pydantic schema containing the new price data.
        product_id: The ID of the product this price log belongs to.

    Returns:
        The newly created PriceLog model instance.
    """
    db_price_log = models.PriceLog(**price.model_dump(), product_id=product_id)
    db.add(db_price_log)
    db.commit()
    db.refresh(db_price_log)
    return db_price_log

def get_price_logs_for_product(
    db: Session, 
    product_id: int, 
    skip: int = 0, 
    limit: int = 1000,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
) -> List[models.PriceLog]:
    """
    Retrieves the historical price logs for a single product.

    Allows for pagination and filtering by a date range, which is useful
    for displaying charts for specific time periods (e.g., "Last 30 Days").

    Args:
        db: The SQLAlchemy database session.
        product_id: The ID of the product to fetch history for.
        skip: The number of records to skip (for pagination).
        limit: The maximum number of records to return.
        start_date: The optional start date for filtering.
        end_date: The optional end date for filtering.

    Returns:
        A list of PriceLog model instances, ordered by most recent first.
    """
    query = db.query(models.PriceLog).filter(models.PriceLog.product_id == product_id)
    
    if start_date:
        query = query.filter(models.PriceLog.scraped_at >= start_date)
    if end_date:
        query = query.filter(models.PriceLog.scraped_at <= end_date)
        
    return query.order_by(models.PriceLog.scraped_at.desc()).offset(skip).limit(limit).all()

def get_latest_price_for_product(db: Session, product_id: int) -> Optional[models.PriceLog]:
    """
    Retrieves only the most recent price log for a specific product.

    This is a convenience function to quickly get the "current" price without
    fetching the entire history.

    Args:
        db: The SQLAlchemy database session.
        product_id: The ID of the product.

    Returns:
        The most recent PriceLog model instance, or None if no history exists.
    """
    return db.query(models.PriceLog)\
        .filter(models.PriceLog.product_id == product_id)\
        .order_by(models.PriceLog.scraped_at.desc())\
        .first()
