from pydantic import BaseModel, AnyHttpUrl
from datetime import datetime

class TrackRequest(BaseModel):
    url: AnyHttpUrl

class ProductOut(BaseModel):
    id: int
    title: str
    brand: str | None = None
    lowest_price_cents: int | None = None
    currency: str | None = "INR"

class PricePoint(BaseModel):
    price_cents: int
    currency: str
    availability: str | None = None
    scraped_at: datetime
