import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.user import User
from app.models.product import Product
from app.models.price_log import PriceLog
from app.crud.users import create_user, get_user_by_username
from app.crud.products import create_product, get_product
from app.schemas.user_schema import UserCreate
from app.schemas.product_schema import ProductCreate

# Test database URL
TEST_DATABASE_URL = "sqlite:///./test_db.db"

engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
    Base.metadata.drop_all(bind=engine)

def test_create_user(db_session):
    user_data = UserCreate(
        email="test@example.com",
        username="testuser",
        password="testpassword"
    )
    user = create_user(db_session, user_data)
    assert user.email == user_data.email
    assert user.username == user_data.username
    assert user.id is not None

def test_get_user_by_username(db_session):
    user_data = UserCreate(
        email="test@example.com",
        username="testuser",
        password="testpassword"
    )
    created_user = create_user(db_session, user_data)

    retrieved_user = get_user_by_username(db_session, "testuser")
    assert retrieved_user is not None
    assert retrieved_user.id == created_user.id

def test_create_product(db_session):
    # First create a user
    user_data = UserCreate(
        email="test@example.com",
        username="testuser",
        password="testpassword"
    )
    user = create_user(db_session, user_data)

    # Then create a product
    product_data = ProductCreate(
        name="Test Product",
        url="https://amazon.in/test",
        platform="amazon",
        description="Test description"
    )
    product = create_product(db_session, product_data, user.id)

    assert product.name == product_data.name
    assert product.platform == product_data.platform
    assert product.user_id == user.id
