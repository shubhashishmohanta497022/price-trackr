from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

# Import the PriceLog schema to use for nested responses
from .price_schema import PriceLog

# --- Product Schemas ---

class ProductBase(BaseModel):
    """
    Base schema for a product, containing fields that are common
    across creation and reading.
    """
    url: HttpUrl
    title: str
    brand: Optional[str] = None
    image_url: Optional[HttpUrl] = None
    sku: Optional[str] = None

class ProductCreate(ProductBase):
    """
    Schema used specifically for creating a new product.
    In this case, it's identical to the base, but it could be extended
    with additional fields needed only at creation time.
    """
    pass

class ProductTrackRequest(BaseModel):
    """
    Schema for the specific request body of the /track endpoint.
    This keeps the API contract clear and simple.
    """
    url: HttpUrl

class Product(ProductBase):
    """
    The main schema for reading/returning a product from the API.
    This includes the database-generated ID.
    """
    id: int

    # Pydantic's configuration class to enable ORM mode.
    # This allows the model to be created from an SQLAlchemy model instance.
    class Config:
        from_attributes = True

class ProductWithHistory(Product):
    """
    An extended schema for returning a product *with* its full price history.
    This is used for the detailed product view endpoint.
    """
    price_history: List[PriceLog] = []


# --- Alert Schemas (for the /api/alerts endpoints) ---

class AlertCreate(BaseModel):
    """
    Schema for creating or updating a price alert for a product.
    """
    product_id: int
    target_price_cents: int
