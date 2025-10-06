import asyncio
import logging
from typing import Dict, Any
from urllib.parse import urlparse
from ..base_scraper import BaseScraper
from ..utils.parser import parser

logger = logging.getLogger(__name__)

class AmazonScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.domains = ['amazon.in', 'amazon.com']

    def can_scrape(self, url: str) -> bool:
        domain = self.extract_domain(url)
        return any(d in domain for d in self.domains)

    async def scrape_product(self, url: str) -> Dict[str, Any]:
        """Scrape Amazon product information"""
        try:
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            await self.handle_bot_detection()

            # Wait for product details to load
            await asyncio.sleep(2)

            # Extract product name
            name_selectors = [
                '#productTitle',
                '.product-title',
                'h1[data-automation-id="product-title"]'
            ]
            name = ""
            for selector in name_selectors:
                name = await self.safe_get_text(selector)
                if name:
                    break

            # Extract current price
            price_selectors = [
                '.a-price-whole',
                '.a-offscreen',
                '.a-price .a-offscreen',
                '.priceBlockBuyingPriceString',
                '.priceBlockDealPriceString'
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
                '.a-price.a-text-price .a-offscreen',
                '.priceBlockStrikePriceString',
                '.a-text-strike'
            ]
            original_price = None
            for selector in original_price_selectors:
                price_text = await self.safe_get_text(selector)
                if price_text:
                    original_price = parser.clean_price(price_text)
                    if original_price:
                        break

            # If no original price found, use current price
            if not original_price:
                original_price = current_price

            # Extract availability
            availability_selectors = [
                '#availability span',
                '.a-color-success',
                '.a-color-state',
                '.availability'
            ]
            availability = "Unknown"
            for selector in availability_selectors:
                availability_text = await self.safe_get_text(selector)
                if availability_text:
                    availability = parser.normalize_availability(availability_text)
                    break

            # Extract image URL
            image_selectors = [
                '#landingImage',
                '.a-dynamic-image',
                '#imgTagWrapperId img'
            ]
            image_url = ""
            for selector in image_selectors:
                image_url = await self.safe_get_attribute(selector, 'src')
                if image_url:
                    image_url = parser.extract_image_url(image_url, url)
                    break

            # Extract description/features
            description_selectors = [
                '#feature-bullets ul',
                '.a-unordered-list.a-vertical',
                '#productDescription'
            ]
            description = ""
            for selector in description_selectors:
                desc_text = await self.safe_get_text(selector)
                if desc_text:
                    description = parser.clean_text(desc_text[:500])  # Limit description length
                    break

            return {
                'name': parser.clean_text(name),
                'price': current_price,
                'original_price': original_price,
                'availability': availability,
                'image_url': image_url,
                'description': description,
                'platform': 'amazon',
                'scraped_at': asyncio.get_event_loop().time()
            }

        except Exception as e:
            logger.error(f"Error scraping Amazon product {url}: {e}")
            raise Exception(f"Failed to scrape Amazon product: {str(e)}")
