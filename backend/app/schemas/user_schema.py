from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Import schemas from other files to handle relationships
# We use a forward reference trick initially to avoid circular import errors
from .product_schema import Product

# --- User Schemas ---

class UserBase(BaseModel):
    """Base schema with common user attributes."""
    email: EmailStr

class UserCreate(UserBase):
    """Schema used for creating a new user. Includes the password."""
    password: str

class User(UserBase):
    """
    Schema for reading/returning user data.
    This model will be used in API responses.
    It omits sensitive information like the password.
    """
    id: int
    is_active: bool
    
    # This will contain a list of products in the user's watchlist.
    # Pydantic will automatically handle the nested serialization.
    watchlist: List[Product] = []

    # Pydantic's configuration class to specify model behavior.
    # `orm_mode = True` tells Pydantic to read the data even if it is not a dict,
    # but an ORM model (like our SQLAlchemy User model).
    class Config:
        from_attributes = True

# --- Token Schemas for Authentication ---

class Token(BaseModel):
    """Schema for the JWT access token response."""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Schema for the data encoded within a JWT."""
    email: Optional[str] = None
