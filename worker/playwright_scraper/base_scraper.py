from abc import ABC, abstractmethod
import asyncio
import logging
from typing import Dict, Any, Optional
from playwright.async_api import async_playwright, Browser, Page
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

class BaseScraper(ABC):
    def __init__(self):
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None

    async def __aenter__(self):
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=True,
            args=[
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        )
        self.page = await self.browser.new_page()

        # Set user agent to avoid bot detection
        await self.page.set_user_agent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
            '(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        )

        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    @abstractmethod
    async def scrape_product(self, url: str) -> Dict[str, Any]:
        """
        Scrape product information from the given URL.

        Returns:
            Dict containing:
            - name: Product name
            - price: Current price (float)
            - original_price: Original price if available (float)
            - availability: Stock status
            - image_url: Product image URL
            - description: Product description
        """
        pass

    @abstractmethod
    def can_scrape(self, url: str) -> bool:
        """Check if this scraper can handle the given URL"""
        pass

    async def wait_for_page_load(self, timeout: int = 30000):
        """Wait for page to load completely"""
        try:
            await self.page.wait_for_load_state('networkidle', timeout=timeout)
        except Exception as e:
            logger.warning(f"Page load timeout: {e}")

    async def handle_bot_detection(self):
        """Handle common bot detection mechanisms"""
        try:
            # Handle CAPTCHA or other bot detection
            await asyncio.sleep(2)  # Random delay

            # Check for common bot detection elements
            captcha_selectors = [
                '[id*="captcha"]',
                '[class*="captcha"]',
                '[id*="robot"]',
                '[class*="challenge"]'
            ]

            for selector in captcha_selectors:
                element = await self.page.query_selector(selector)
                if element:
                    logger.warning(f"Bot detection detected: {selector}")
                    raise Exception("Bot detection triggered")

        except Exception as e:
            logger.error(f"Bot detection handling failed: {e}")
            raise

    def extract_domain(self, url: str) -> str:
        """Extract domain from URL"""
        try:
            return urlparse(url).netloc.lower()
        except Exception:
            return ""

    async def safe_get_text(self, selector: str, default: str = "") -> str:
        """Safely get text from an element"""
        try:
            element = await self.page.query_selector(selector)
            if element:
                return await element.inner_text()
            return default
        except Exception:
            return default

    async def safe_get_attribute(self, selector: str, attribute: str, default: str = "") -> str:
        """Safely get attribute from an element"""
        try:
            element = await self.page.query_selector(selector)
            if element:
                return await element.get_attribute(attribute) or default
            return default
        except Exception:
            return default

    def clean_price(self, price_text: str) -> Optional[float]:
        """Extract numeric price from text"""
        try:
            import re
            # Remove currency symbols and extract numbers
            price_clean = re.sub(r'[^0-9.,]', '', price_text)
            price_clean = price_clean.replace(',', '')

            if '.' in price_clean:
                return float(price_clean)
            else:
                return float(price_clean)
        except (ValueError, AttributeError):
            return None

    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        if not text:
            return ""
        return ' '.join(text.strip().split())
