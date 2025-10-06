import asyncio
import logging
from typing import Dict, Any
from ..base_scraper import BaseScraper
from ..utils.parser import parser

logger = logging.getLogger(__name__)

class FlipkartScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.domains = ['flipkart.com']

    def can_scrape(self, url: str) -> bool:
        domain = self.extract_domain(url)
        return 'flipkart.com' in domain

    async def scrape_product(self, url: str) -> Dict[str, Any]:
        """Scrape Flipkart product information"""
        try:
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            await self.handle_bot_detection()

            # Close login popup if present
            try:
                close_btn = await self.page.query_selector('button._2KpZ6l._2doB4z')
                if close_btn:
                    await close_btn.click()
                    await asyncio.sleep(1)
            except:
                pass

            # Extract product name
            name_selectors = [
                '.B_NuCI',
                '._35KyD6',
                'h1[data-automation-id="product-title"]'
            ]
            name = ""
            for selector in name_selectors:
                name = await self.safe_get_text(selector)
                if name:
                    break

            # Extract current price
            price_selectors = [
                '._30jeq3._16Jk6d',
                '._3I9_wc._27UcVY',
                '._1_WHN1'
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
                '._3I9_wc._2_R_DZ',
                '._14999D'
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

            # Extract availability
            availability_selectors = [
                '._16FRp0',
                '._3xgqrR'
            ]
            availability = "In Stock"  # Default for Flipkart
            for selector in availability_selectors:
                availability_text = await self.safe_get_text(selector)
                if availability_text and 'out of stock' in availability_text.lower():
                    availability = "Out of Stock"
                    break

            # Extract image URL
            image_selectors = [
                '._396cs4._2amPTt._3qGmMb img',
                '._2r_T1I img',
                '.CXW8mj img'
            ]
            image_url = ""
            for selector in image_selectors:
                image_url = await self.safe_get_attribute(selector, 'src')
                if image_url:
                    image_url = parser.extract_image_url(image_url, url)
                    break

            # Extract description
            description_selectors = [
                '._1mXcCf',
                '.rgWa7D',
                '._3WHvuP'
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
                'platform': 'flipkart',
                'scraped_at': asyncio.get_event_loop().time()
            }

        except Exception as e:
            logger.error(f"Error scraping Flipkart product {url}: {e}")
            raise Exception(f"Failed to scrape Flipkart product: {str(e)}")
