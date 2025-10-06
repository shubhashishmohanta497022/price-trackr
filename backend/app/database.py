from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .config import settings

# Create the SQLAlchemy engine using the database URL from the config.
# The `pool_pre_ping` argument helps prevent connection errors after long idle periods.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True
)

# Create a configured "Session" class. This is not a session itself,
# but a factory for creating session objects.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for our models to inherit from.
# This allows SQLAlchemy's declarative system to map our classes to database tables.
Base = declarative_base()

# --- FastAPI Dependency ---
def get_db():
    """
    A generator function that yields a new database session for each request.
    This is a standard FastAPI dependency injection pattern.
    It ensures that the database session is always closed after the request
    is finished, even if an error occurs.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

