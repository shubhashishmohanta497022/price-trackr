import abc
import re
from typing import Optional
from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError
from pydantic import BaseModel, HttpUrl, Field

# --- Standardized Data Structure ---
# Use Pydantic to define the exact data structure that every successful scrape must return.
# This provides automatic data validation and ensures consistency.
class ScrapedData(BaseModel):
    url: HttpUrl
    title: str
    price_cents: int
    currency: str = "INR" # Default currency, can be overridden
    availability: Optional[str] = None
    brand: Optional[str] = None
    image_url: Optional[HttpUrl] = None
    sku: Optional[str] = None

class BaseScraper(abc.ABC):
    """
    An abstract base class that defines the contract for all site-specific scrapers.

    Each new scraper for a site (e.g., Amazon, Flipkart) must inherit from this
    class and implement all its abstract methods. This enforces a consistent
    interface and data return structure across the entire scraping engine.
    """
    def __init__(self, page: Page, url: str):
        self.page = page
        self.url = url
        self.soup = None # Placeholder for BeautifulSoup if needed as a fallback

    # --- Abstract Methods (Must be implemented by subclasses) ---
    # These methods contain the site-specific logic (e.g., CSS selectors).
    
    @abc.abstractmethod
    def _scrape_title(self) -> Optional[str]:
        """Scrapes the product title from the page."""
        raise NotImplementedError

    @abc.abstractmethod
    def _scrape_price(self) -> Optional[str]:
        """
        Scrapes the raw price string from the page (e.g., "₹1,299.00").
        The cleaning logic is handled by the base class.
        """
        raise NotImplementedError

    @abc.abstractmethod
    def _scrape_availability(self) -> Optional[str]:
        """Scrapes the availability status (e.g., "In Stock")."""
        raise NotImplementedError

    # --- Optional Abstract Methods (Can be overridden if needed) ---
    
    def _scrape_brand(self) -> Optional[str]:
        """Optionally scrapes the product's brand."""
        return None

    def _scrape_image_url(self) -> Optional[str]:
        """Optionally scrapes the main product image URL."""
        return None

    def _scrape_sku(self) -> Optional[str]:
        """Optionally scrapes the product's SKU or model number."""
        return None

    # --- Utility Methods (Shared logic) ---

    def _clean_price(self, price_str: str) -> Optional[int]:
        """
        Cleans a raw price string and converts it to an integer of the smallest
        currency unit (e.g., cents, paise).
        Handles currency symbols, commas, and decimal points.
        """
        if not price_str:
            return None
        try:
            # Remove currency symbols, commas, and get only the digits
            cleaned_price = re.sub(r'[^\d.]', '', price_str)
            # Convert to float first to handle decimals, then multiply by 100 and cast to int
            return int(float(cleaned_price) * 100)
        except (ValueError, TypeError):
            return None

    # --- Main Orchestration Method ---

    def scrape(self) -> Optional[ScrapedData]:
        """
        The main public method to run the scraper.

        It navigates to the URL, orchestrates the scraping of individual data points
        by calling the abstract methods, cleans the data, validates it with Pydantic,
        and returns the structured data.
        """
        try:
            print(f"Navigating to {self.url}...")
            self.page.goto(self.url, wait_until="domcontentloaded", timeout=60000) # 60s timeout
            print("Page loaded.")

            # Scrape individual fields using the site-specific implementations
            raw_price = self._scrape_price()
            price_cents = self._clean_price(raw_price)
            title = self._scrape_title()
            
            # A product is invalid without a title or a price
            if not title or price_cents is None:
                print(f"Failed to scrape essential data (title/price) for {self.url}")
                return None

            # Create the structured data object
            scraped_data = ScrapedData(
                url=self.url,
                title=title,
                price_cents=price_cents,
                availability=self._scrape_availability(),
                brand=self._scrape_brand(),
                image_url=self._scrape_image_url(),
                sku=self._scrape_sku()
            )
            
            print(f"Successfully scraped: {scraped_data.title}")
            return scraped_data

        except PlaywrightTimeoutError:
            print(f"Timeout error while scraping {self.url}")
            return None
        except Exception as e:
            print(f"An unexpected error occurred while scraping {self.url}: {e}")
            return None
