import re
from typing import Optional
from urllib.parse import urlparse

class Validators:
    @staticmethod
    def is_valid_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

    @staticmethod
    def is_valid_url(url: str) -> bool:
        """Validate URL format"""
        try:
            result = urlparse(url)
            return all([result.scheme, result.netloc])
        except Exception:
            return False

    @staticmethod
    def is_supported_platform(url: str) -> Optional[str]:
        """Check if URL is from a supported e-commerce platform"""
        supported_platforms = {
            'amazon.in': 'amazon',
            'amazon.com': 'amazon',
            'flipkart.com': 'flipkart',
            'myntra.com': 'myntra',
            'croma.com': 'croma',
            'ajio.com': 'ajio'
        }

        try:
            domain = urlparse(url).netloc.lower()
            for platform_domain, platform_name in supported_platforms.items():
                if platform_domain in domain:
                    return platform_name
            return None
        except Exception:
            return None

    @staticmethod
    def is_valid_price(price: float) -> bool:
        """Validate price value"""
        return price > 0 and price < 10000000  # Max price of 1 crore

    @staticmethod
    def sanitize_product_name(name: str) -> str:
        """Sanitize product name"""
        # Remove extra whitespace and limit length
        return ' '.join(name.split())[:200]
