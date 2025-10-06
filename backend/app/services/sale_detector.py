from typing import List, Dict, Any
from app.models.product import Product
from app.models.price_log import PriceLog
from sqlalchemy.orm import Session
import statistics
import logging

logger = logging.getLogger(__name__)

class SaleDetector:
    def __init__(self):
        self.min_discount_threshold = 10.0  # Minimum 10% discount to consider as sale
        self.price_history_days = 30

    def detect_sales(self, product: Product, recent_prices: List[PriceLog]) -> Dict[str, Any]:
        """Detect if a product is currently on sale"""
        if len(recent_prices) < 3:
            return {"is_sale": False, "reason": "Insufficient price history"}

        current_price = recent_prices[0].price
        historical_prices = [log.price for log in recent_prices[1:]]

        # Calculate average historical price
        avg_historical_price = statistics.mean(historical_prices)

        # Calculate discount percentage
        discount_percentage = ((avg_historical_price - current_price) / avg_historical_price) * 100

        is_sale = discount_percentage >= self.min_discount_threshold

        return {
            "is_sale": is_sale,
            "discount_percentage": round(discount_percentage, 2),
            "current_price": current_price,
            "average_historical_price": round(avg_historical_price, 2),
            "savings": round(avg_historical_price - current_price, 2) if is_sale else 0
        }

    def get_trending_sales(self, db: Session, limit: int = 20) -> List[Dict[str, Any]]:
        """Get trending sales across all products"""
        # This would query the database for products with recent significant price drops
        # For now, it's a placeholder
        return []

    def predict_future_sales(self, product: Product, price_history: List[PriceLog]) -> Dict[str, Any]:
        """Predict likelihood of future sales based on historical patterns"""
        # This could use ML models to predict sales patterns
        # For now, it's a placeholder
        return {
            "prediction": "No prediction available",
            "confidence": 0.0
        }

sale_detector = SaleDetector()
