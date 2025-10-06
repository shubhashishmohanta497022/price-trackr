from sqlalchemy.orm import Session
from .. import models
from ..schemas import product_schema

def get_product(db: Session, product_id: int):
    """
    Fetches a single product from the database by its primary key (ID).

    Args:
        db: The SQLAlchemy database session.
        product_id: The ID of the product to retrieve.

    Returns:
        The Product model instance if found, otherwise None.
    """
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_product_by_url(db: Session, url: str):
    """
    Fetches a single product from the database by its unique URL.

    Args:
        db: The SQLAlchemy database session.
        url: The URL of the product to retrieve.

    Returns:
        The Product model instance if found, otherwise None.
    """
    return db.query(models.Product).filter(models.Product.url == url).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    """
    Fetches a paginated list of all products from the database.

    Args:
        db: The SQLAlchemy database session.
        skip: The number of records to skip (for pagination).
        limit: The maximum number of records to return.

    Returns:
        A list of Product model instances.
    """
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: product_schema.ProductCreate):
    """
    Creates a new product record in the database.

    Args:
        db: The SQLAlchemy database session.
        product: A Pydantic schema containing the new product's data.

    Returns:
        The newly created Product model instance.
    """
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_or_create_product(db: Session, product_data: product_schema.ProductCreate):
    """
    A utility function that retrieves a product by URL if it exists,
    or creates it if it does not. This is the primary method for adding
    new products to prevent duplicates.

    Args:
        db: The SQLAlchemy database session.
        product_data: A Pydantic schema with the product's data, including the URL.

    Returns:
        An existing or newly created Product model instance.
    """
    db_product = get_product_by_url(db, url=product_data.url)
    if db_product:
        return db_product
    return create_product(db, product=product_data)
