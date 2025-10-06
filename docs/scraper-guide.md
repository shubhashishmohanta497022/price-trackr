🕷️ Scraper Development Guide
This guide explains how to add a new e-commerce site scraper to the Price Trackr worker.

1. Core Architecture
The scraping engine is designed to be modular and extensible. The core of this design is the BaseScraper abstract class located in worker/playwright_scraper/base_scraper.py.

Every new site-specific scraper must inherit from this base class. This enforces a consistent interface and ensures that every scraper returns data in the same, predictable format (ScrapedData Pydantic model), which the rest of the system can then process.

2. How to Add a New Scraper
Let's add a scraper for a fictional site, coolstuff.com.

Step 1: Find CSS Selectors
Before writing any code, you need to identify the CSS selectors for the data you want to extract.

Go to a product page on the target website (e.g., https://www.coolstuff.com/product/widget-pro).

Open your browser's Developer Tools (usually by pressing F12 or right-clicking and selecting "Inspect").

Use the "Inspector" or "Elements" tab to find the HTML elements containing the product title, price, and availability.

Find a stable and unique CSS selector for each element. IDs are best, followed by specific class names. Avoid highly generic or auto-generated class names.

Example findings for coolstuff.com:

Title: An <h1> tag with the ID #product-title.

Price: A <span> tag with the class .product-price__value.

Availability: A <div> tag with the class .stock-status--in-stock.

Step 2: Create the Scraper File
Create a new Python file in the scrapers directory:
worker/playwright_scraper/scrapers/coolstuff.py

Step 3: Implement the Scraper Class
Inside your new file, create a class that inherits from BaseScraper and implement the required abstract methods using the selectors you found.

# worker/playwright_scraper/scrapers/coolstuff.py

from typing import Optional
from ..base_scraper import BaseScraper

class CoolStuffScraper(BaseScraper):
    """
    Scraper for coolstuff.com.
    """

    def _scrape_title(self) -> Optional[str]:
        """Scrapes the product title using its ID."""
        try:
            # self.page is the Playwright Page object from the base class
            return self.page.locator("#product-title").inner_text()
        except Exception:
            return None

    def _scrape_price(self) -> Optional[str]:
        """Scrapes the raw price string from the page."""
        try:
            # The base class will handle cleaning this string (e.g., "₹1,299.00")
            return self.page.locator(".product-price__value").inner_text()
        except Exception:
            return None

    def _scrape_availability(self) -> Optional[str]:
        """Scrapes the availability status."""
        try:
            # We can check for the existence of an element
            if self.page.locator(".stock-status--in-stock").is_visible():
                return "In Stock"
            elif self.page.locator(".stock-status--out-of-stock").is_visible():
                return "Out of Stock"
            return None
        except Exception:
            return None
    
    # You can also implement optional methods if the data is available
    def _scrape_brand(self) -> Optional[str]:
        try:
            # Example: Find a link with a specific data attribute
            return self.page.locator("a[data-test-id='product-brand-link']").inner_text()
        except Exception:
            return None

Step 4: Register the New Scraper
The final and most important step is to tell the worker that your new scraper exists.

Open the runner file: worker/playwright_scraper/runner.py

Import your new scraper class at the top of the file.

Add an entry to the SCRAPER_MAPPING dictionary, mapping the site's domain to your new class.

# worker/playwright_scraper/runner.py

# ... other imports
from .scrapers.amazon import AmazonScraper
from .scrapers.flipkart import FlipkartScraper
from .scrapers.coolstuff import CoolStuffScraper # 1. Import your new class

# ...

SCRAPER_MAPPING = {
    'www.amazon.in': AmazonScraper,
    '[www.flipkart.com](https://www.flipkart.com)': FlipkartScraper,
    '[www.coolstuff.com](https://www.coolstuff.com)': CoolStuffScraper, # 2. Add the mapping
}

# ... rest of the file
