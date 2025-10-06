import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
from typing import List, Dict, Any
from app.config import settings
from app.models.product import Product
from app.models.price_log import PriceLog
import logging

logger = logging.getLogger(__name__)

class AlertsService:
    def __init__(self):
        self.smtp_server = settings.SMTP_SERVER
        self.smtp_port = settings.SMTP_PORT
        self.email_address = settings.EMAIL_ADDRESS
        self.email_password = settings.EMAIL_PASSWORD

    async def send_price_drop_alert(self, user_email: str, product: Product, new_price: float, old_price: float):
        """Send price drop alert email"""
        try:
            discount_percent = ((old_price - new_price) / old_price) * 100

            msg = MimeMultipart()
            msg['From'] = self.email_address
            msg['To'] = user_email
            msg['Subject'] = f"Price Drop Alert: {product.name}"

            body = f"""
            Great news! The price of {product.name} has dropped!

            Old Price: ₹{old_price:.2f}
            New Price: ₹{new_price:.2f}
            You Save: ₹{old_price - new_price:.2f} ({discount_percent:.1f}% off)

            Product Link: {product.url}

            Happy Shopping!
            Price Trackr Team
            """

            msg.attach(MimeText(body, 'plain'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_address, self.email_password)
            text = msg.as_string()
            server.sendmail(self.email_address, user_email, text)
            server.quit()

            logger.info(f"Price drop alert sent to {user_email} for product {product.id}")

        except Exception as e:
            logger.error(f"Failed to send price drop alert: {e}")

    async def check_and_send_alerts(self, products: List[Product]):
        """Check for price drops and send alerts"""
        for product in products:
            # This would typically check against user-defined alert thresholds
            # For now, it's a placeholder
            pass

alerts_service = AlertsService()
