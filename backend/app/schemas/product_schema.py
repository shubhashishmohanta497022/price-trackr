from sqlalchemy import Column, Integer, String, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base

class PriceLog(Base):
    """
    SQLAlchemy model representing a single price data point for a product
    at a specific point in time. This creates the historical price log.
    """
    __tablename__ = "price_logs"

    # --- Table Columns ---
    id = Column(Integer, primary_key=True, index=True)
    
    # The foreign key links this price log entry to a specific product.
    # `ondelete="CASCADE"` means if a product is deleted, all its associated
    # price logs will be deleted automatically by the database.
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)

    # Storing price in the smallest currency unit (e.g., cents, paise) as an integer
    # is a best practice to avoid floating-point precision issues with money.
    # BigInteger is used to support very large price values if needed.
    price_cents = Column(BigInteger, nullable=False)
    
    # ISO 4217 currency code (e.g., "USD", "INR", "EUR").
    currency = Column(String(3), nullable=False)
    
    # The availability status scraped from the site (e.g., "In Stock", "Out of Stock").
    availability = Column(String, nullable=True)

    # The timestamp when the data was scraped.
    # `server_default=func.now()` sets the default value to the current time
    # on the database server when a new record is created.
    scraped_at = Column(DateTime(timezone=True), server_default=func.now())

    # --- Relationships ---
    
    # Defines the many-to-one relationship back to the Product model.
    # Many price log entries can belong to one product.
    # 'back_populates' creates a two-way link with the 'price_logs' relationship in the Product model.
    product = relationship("Product", back_populates="price_logs")

    def __repr__(self):
        return (
            f"<PriceLog(id={self.id}, product_id={self.product_id}, "
            f"price_cents={self.price_cents}, scraped_at={self.scraped_at})>"
        )

