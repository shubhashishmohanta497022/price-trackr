from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import crud
from ..schemas import product_schema, user_schema # Assuming alert schemas might be part of these
from ..database import get_db

# --- Placeholder for Authentication ---
# In a real application, you would have a robust dependency that decodes a JWT
# and returns the current user model.
from ..models.user import User
async def get_current_active_user(db: Session = Depends(get_db)) -> User:
    """
    This is a placeholder dependency for user authentication.
    It simulates retrieving the first user from the database.
    Replace this with your actual JWT token verification logic.
    """
    user = db.query(User).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user
# --- End of Placeholder ---


router = APIRouter()

# NOTE: For this to work, you would typically modify the `user_watchlist`
# association table (in `models/user.py`) to include a column like:
# Column('target_price_cents', Integer, nullable=True)
#
# You would also need corresponding CRUD functions to set/update this value.
# The following code assumes these modifications have been made.

@router.post("/", status_code=status.HTTP_201_CREATED)
def set_price_alert(
    alert_in: product_schema.AlertCreate, # A new Pydantic schema would be needed here
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Set or update a price alert for a product in the current user's watchlist.
    
    If the product is not on the watchlist, it should be added first.
    """
    # 1. Check if the product is on the user's watchlist
    product = crud.products.get_product(db, alert_in.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    if product not in current_user.watchlist:
        # Or you could automatically add it:
        # crud.users.add_product_to_watchlist(db, user_id=current_user.id, product_id=alert_in.product_id)
        raise HTTPException(status_code=400, detail="Product not in watchlist. Please add it first.")

    # 2. Call a (hypothetical) CRUD function to set the target price
    # updated_watchlist_item = crud.alerts.set_alert(
    #     db, 
    #     user_id=current_user.id, 
    #     product_id=alert_in.product_id, 
    #     target_price=alert_in.target_price_cents
    # )
    
    # Placeholder response
    return {"message": f"Alert for product {alert_in.product_id} set to {alert_in.target_price_cents}"}


@router.get("/", response_model=List[product_schema.Product]) # A new response model would be better
def get_user_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get a list of all products for which the current user has an active alert.
    """
    # This would require a CRUD function that fetches watchlist items
    # where `target_price_cents` is not NULL.
    # alert_products = crud.alerts.get_alerts_for_user(db, user_id=current_user.id)
    
    # For now, we return the user's whole watchlist as a placeholder
    return current_user.watchlist


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_price_alert(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Remove a price alert for a specific product in the user's watchlist.
    (This would typically set the target_price_cents to NULL).
    """
    # Call a (hypothetical) CRUD function to remove the alert
    # crud.alerts.delete_alert(db, user_id=current_user.id, product_id=product_id)
    print(f"Alert for product {product_id} for user {current_user.id} has been removed.")
    return
