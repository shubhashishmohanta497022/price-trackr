from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from .. import crud, models
from ..schemas import user_schema, product_schema
from ..database import get_db
from ..config import settings

# --- Placeholder Authentication Service ---
# In a larger application, this logic would live in a dedicated `services/auth.py` file.
# For simplicity, we define it here.
from jose import JWTError, jwt

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Creates a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_active_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token")), db: Session = Depends(get_db)):
    """
    Placeholder dependency to get the current authenticated user from a token.
    This would be much more robust in a real application.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = user_schema.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = crud.users.get_user_by_email(db, email=token_data.email)
    if user is None or not user.is_active:
        raise credentials_exception
    return user
# --- End of Authentication Service ---


router = APIRouter()

@router.post("/register", response_model=user_schema.User, status_code=status.HTTP_201_CREATED)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    """
    db_user = crud.users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.users.create_user(db=db, user=user)

@router.post("/token", response_model=user_schema.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Standard OAuth2 password flow to authenticate a user and get an access token.
    """
    user = crud.users.get_user_by_email(db, email=form_data.username)
    if not user or not crud.users.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=user_schema.User)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    """
    Fetch the details of the currently authenticated user, including their watchlist.
    """
    return current_user

@router.post("/me/watchlist/{product_id}", response_model=user_schema.User)
def add_product_to_user_watchlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Add a product to the current user's watchlist.
    """
    db_product = crud.products.get_product(db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_user = crud.users.add_product_to_watchlist(db, user_id=current_user.id, product_id=product_id)
    return updated_user

@router.delete("/me/watchlist/{product_id}", response_model=user_schema.User)
def remove_product_from_user_watchlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Remove a product from the current user's watchlist.
    """
    updated_user = crud.users.remove_product_from_watchlist(db, user_id=current_user.id, product_id=product_id)
    return updated_user
