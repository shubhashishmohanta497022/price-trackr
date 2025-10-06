import asyncio
import logging
from typing import Dict, Any
from ..base_scraper import BaseScraper
from ..utils.parser import parser

logger = logging.getLogger(__name__)

class AjioScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.domains = ['ajio.com']

    def can_scrape(self, url: str) -> bool:
        domain = self.extract_domain(url)
        return 'ajio.com' in domain

    async def scrape_product(self, url: str) -> Dict[str, Any]:
        """Scrape Ajio product information"""
        try:
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            await self.handle_bot_detection()

            await asyncio.sleep(2)

            # Extract product name
            name_selectors = [
                '.prod-name',
                'h1.product-title',
                '.pdp-product-name'
            ]
            name = ""
            for selector in name_selectors:
                name = await self.safe_get_text(selector)
                if name:
                    break

            # Extract current price
            price_selectors = [
                '.prod-sp',
                '.current-price',
                '.price-current'
            ]
            current_price = None
            for selector in price_selectors:
                price_text = await self.safe_get_text(selector)
                if price_text:
                    current_price = parser.clean_price(price_text)
                    if current_price:
                        break

            # Extract original price (if on sale)
            original_price_selectors = [
                '.prod-mrp',
                '.original-price',
                '.price-was'
            ]
            original_price = None
            for selector in original_price_selectors:
                price_text = await self.safe_get_text(selector)
                if price_text:
                    original_price = parser.clean_price(price_text)
                    if original_price:
                        break

            if not original_price:
                original_price = current_price

            # Extract availability (Ajio usually shows available products)
            availability = "In Stock"

            # Extract image URL
            image_selectors = [
                '.rilrtl-lazy-img',
                '.product-image img',
                '.img-responsive'
            ]
            image_url = ""
            for selector in image_selectors:
                image_url = await self.safe_get_attribute(selector, 'src')
                if image_url:
                    image_url = parser.extract_image_url(image_url, url)
                    break

            # Extract description
            description_selectors = [
                '.prod-details',
                '.product-description',
                '.pdp-product-details'
            ]
            description = ""
            for selector in description_selectors:
                desc_text = await self.safe_get_text(selector)
                if desc_text:
                    description = parser.clean_text(desc_text[:500])
                    break

            return {
                'name': parser.clean_text(name),
                'price': current_price,
                'original_price': original_price,
                'availability': availability,
                'image_url': image_url,
                'description': description,
                'platform': 'ajio',
                'scraped_at': asyncio.get_event_loop().time()
            }

        except Exception as e:
            logger.error(f"Error scraping Ajio product {url}: {e}")
            raise Exception(f"Failed to scrape Ajio product: {str(e)}")
