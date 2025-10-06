from sqlalchemy import Column, Integer, String, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship

from ..database import Base

# --- Association Table for Many-to-Many Relationship ---
# This is not a class model, but a declarative SQLAlchemy Table.
# It connects the 'users' and 'products' tables, creating a watchlist.
user_watchlist = Table('user_watchlist', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('product_id', Integer, ForeignKey('products.id'), primary_key=True)
)

class User(Base):
    """
    SQLAlchemy model representing a user of the application.
    """
    __tablename__ = "users"

    # --- Table Columns ---
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # --- Relationships ---
    
    # Defines the many-to-many relationship with the Product model.
    # 'secondary=user_watchlist' tells SQLAlchemy to use our association table
    # to manage this relationship.
    # 'back_populates' links to the 'watchers' relationship in the Product model,
    # creating a two-way connection.
    watchlist = relationship(
        "Product",
        secondary=user_watchlist,
        back_populates="watchers"
    )

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}')>"

