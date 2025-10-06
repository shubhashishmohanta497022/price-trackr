from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from typing import List, Optional
from datetime import datetime, timedelta
from app.models.price_log import PriceLog
from app.schemas.price_schema import PriceLogCreate

def create_price_log(db: Session, price_log: PriceLogCreate) -> PriceLog:
    db_price_log = PriceLog(**price_log.dict())
    db.add(db_price_log)
    db.commit()
    db.refresh(db_price_log)
    return db_price_log

def get_price_logs(db: Session, product_id: int, limit: int = 100) -> List[PriceLog]:
    return db.query(PriceLog).filter(PriceLog.product_id == product_id).order_by(desc(PriceLog.timestamp)).limit(limit).all()

def get_price_logs_by_date_range(db: Session, product_id: int, start_date: datetime, end_date: datetime) -> List[PriceLog]:
    return db.query(PriceLog).filter(
        PriceLog.product_id == product_id,
        PriceLog.timestamp >= start_date,
        PriceLog.timestamp <= end_date
    ).order_by(asc(PriceLog.timestamp)).all()

def get_latest_price(db: Session, product_id: int) -> Optional[PriceLog]:
    return db.query(PriceLog).filter(PriceLog.product_id == product_id).order_by(desc(PriceLog.timestamp)).first()

def get_lowest_price(db: Session, product_id: int, days: int = 30) -> Optional[PriceLog]:
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    return db.query(PriceLog).filter(
        PriceLog.product_id == product_id,
        PriceLog.timestamp >= cutoff_date
    ).order_by(asc(PriceLog.price)).first()
