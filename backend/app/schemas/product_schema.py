from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    url: str
    platform: str
    description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    platform: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class Product(ProductBase):
    id: int
    current_price: Optional[float] = None
    original_price: Optional[float] = None
    image_url: Optional[str] = None
    availability: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    user_id: int

    class Config:
        from_attributes = True

class ProductWithPriceHistory(Product):
    price_logs: List["PriceLog"] = []
