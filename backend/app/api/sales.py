from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Literal

# --- Pydantic Schema for Sales Data ---
# This defines the structure of the data we'll send to the frontend.
# In a more advanced system, this would likely have a corresponding DB model.
class SaleEvent(BaseModel):
    id: int
    title: str
    store: str
    discount_summary: str
    status: Literal["ongoing", "upcoming", "top_deal"]
    category: str
    details: str

router = APIRouter()

# --- Mock Sales Data ---
# This data is hardcoded to match the UI mockup. A real service would generate this dynamically.
mock_sales_data: List[SaleEvent] = [
    {
        "id": 1,
        "title": "Great Indian Festival",
        "store": "Amazon",
        "discount_summary": "Up to 80% off",
        "status": "ongoing",
        "category": "Electronics",
        "details": "Massive discounts on mobiles, laptops, and home appliances."
    },
    {
        "id": 2,
        "title": "Big Billion Days",
        "store": "Flipkart",
        "discount_summary": "Up to 75% off",
        "status": "ongoing",
        "category": "Fashion",
        "details": "Major price drops on clothing, footwear, and accessories."
    },
    {
        "id": 3,
        "title": "End of Season Sale",
        "store": "Myntra",
        "discount_summary": "Flat 50-80% off",
        "status": "upcoming",
        "category": "Clothing",
        "details": "Get ready for the biggest fashion sale of the season."
    },
    {
        "id": 4,
        "title": "Weekend Sale",
        "store": "Ajio",
        "discount_summary": "Extra 20% off",
        "status": "top_deal",
        "category": "All Categories",
        "details": "Use code WEEKEND20 for an extra discount on all items."
    },
]

@router.get("/", response_model=List[SaleEvent])
def get_active_sales():
    """
    Retrieves a list of current and upcoming sales events.

    **Note:** This is a placeholder endpoint using mock data.
    In a full implementation, this data would be populated by a
    'sale_detector' service that periodically scans e-commerce sites
    and updates a database table with this information.
    """
    return mock_sales_data
