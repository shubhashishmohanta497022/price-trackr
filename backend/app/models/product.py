from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from ..database import Base

class Product(Base):
    """
    SQLAlchemy model representing a product being tracked.
    Each row in this table is a unique product from an e-commerce site.
    """
    __tablename__ = "products"

    # --- Table Columns ---
    id = Column(Integer, primary_key=True, index=True)
    
    # The unique URL of the product page. This is the main identifier.
    url = Column(String, unique=True, index=True, nullable=False)
    
    # Scraped information about the product.
    title = Column(String, index=True, nullable=False)
    brand = Column(String, nullable=True)
    image_url = Column(Text, nullable=True) # Using Text for potentially long URLs
    sku = Column(String, unique=True, nullable=True, index=True, comment="Stock Keeping Unit or Product Code")

    # --- Relationships ---
    
    # Defines a one-to-many relationship with the PriceLog model.
    # One product can have many price log entries over time.
    # 'back_populates' creates a two-way link with the 'product' relationship in the PriceLog model.
    # 'cascade="all, delete-orphan"' ensures that when a product is deleted, all of its associated
    # price history records are also automatically deleted.
    price_logs = relationship(
        "PriceLog", 
        back_populates="product", 
        cascade="all, delete-orphan"
    )

    # Defines the many-to-many relationship with the User model.
    # This relationship is managed through the 'user_watchlist' association table (defined in user.py).
    # It allows many users to watch many products.
    # 'back_populates' links to the 'watchlist' relationship in the User model.
    watchers = relationship(
        "User", 
        secondary="user_watchlist", 
        back_populates="watchlist"
    )

    def __repr__(self):
        return f"<Product(id={self.id}, title='{self.title[:30]}...')>"

