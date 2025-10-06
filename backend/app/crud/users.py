from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .. import models
from ..schemas import user_schema

# --- Password Hashing Setup ---
# 1. Define the hashing algorithm to use (bcrypt is a strong, standard choice).
# 2. `deprecated="auto"` will automatically handle upgrading hashes if you change algorithms later.
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain-text password against a hashed password.

    Args:
        plain_password: The password to check.
        hashed_password: The stored hash to check against.

    Returns:
        True if the passwords match, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hashes a plain-text password.

    Args:
        password: The password to hash.

    Returns:
        The resulting password hash as a string.
    """
    return pwd_context.hash(password)
# 
# --- User CRUD Functions ---

def get_user(db: Session, user_id: int):
    """Fetches a single user by their primary key (ID)."""
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    """Fetches a single user by their email address. Crucial for login."""
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: user_schema.UserCreate):
    """
    Creates a new user in the database.

    This function takes the user's plain-text password, hashes it, and then
    creates the user record.
    """
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Watchlist Management Functions ---

def add_product_to_watchlist(db: Session, user_id: int, product_id: int):
    """
    Adds a product to a user's watchlist.

    This function manages the many-to-many relationship by finding the user
    and the product, and then appending the product to the user's watchlist
    collection if it's not already there.
    """
    user = get_user(db, user_id)
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    
    if user and product and product not in user.watchlist:
        user.watchlist.append(product)
        db.commit()
        db.refresh(user)
    return user

def remove_product_from_watchlist(db: Session, user_id: int, product_id: int):
    """Removes a product from a user's watchlist."""
    user = get_user(db, user_id)
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if user and product and product in user.watchlist:
        user.watchlist.remove(product)
        db.commit()
        db.refresh(user)
    return user
