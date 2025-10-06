from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    url = Column(Text, nullable=False)
    platform = Column(String, nullable=False)  # amazon, flipkart, etc.
    current_price = Column(Float)
    original_price = Column(Float)
    image_url = Column(Text)
    description = Column(Text)
    availability = Column(String, default="In Stock")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    price_logs = relationship("PriceLog", back_populates="product")
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="products")
