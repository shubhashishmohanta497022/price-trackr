from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from app.models.product import Product
from app.models.price_log import PriceLog
from app.schemas.product_schema import ProductCreate, ProductUpdate

def get_product(db: Session, product_id: int) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100, user_id: int = None) -> List[Product]:
    query = db.query(Product)
    if user_id:
        query = query.filter(Product.user_id == user_id)
    return query.offset(skip).limit(limit).all()

def create_product(db: Session, product: ProductCreate, user_id: int) -> Product:
    db_product = Product(**product.dict(), user_id=user_id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: ProductUpdate) -> Optional[Product]:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        for key, value in product_update.dict(exclude_unset=True).items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int) -> bool:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return True
    return False

def get_product_price_history(db: Session, product_id: int, limit: int = 50) -> List[PriceLog]:
    return db.query(PriceLog).filter(PriceLog.product_id == product_id).order_by(desc(PriceLog.timestamp)).limit(limit).all()
