from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PriceLogBase(BaseModel):
    price: float
    discount_percentage: Optional[float] = 0.0
    availability: str = "In Stock"

class PriceLogCreate(PriceLogBase):
    product_id: int

class PriceLog(PriceLogBase):
    id: int
    product_id: int
    timestamp: datetime

    class Config:
        from_attributes = True
