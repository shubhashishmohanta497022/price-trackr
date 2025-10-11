from playwright.sync_api import sync_playwright
from ..base_scraper import static_parse

SELECTORS = {
  "title": "#productTitle",
  "price": "span.a-price span.a-offscreen",
  "availability": "#availability span"
}

def scrape(url: str) -> dict | None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent="Mozilla/5.0")
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        # Try dynamic
        try:
            page.wait_for_selector(SELECTORS["price"], timeout=5000)
            title = page.locator(SELECTORS["title"]).inner_text().strip()
            price_text = page.locator(SELECTORS["price"]).first.inner_text().strip()
            availability = page.locator(SELECTORS["availability"]).inner_text().strip() if page.locator(SELECTORS["availability"]).count() else None
            browser.close()
            from ..base_scraper import to_minor
            return {"title": title, "price": to_minor(price_text), "currency": "INR", "availability": availability, "url": url}
        except Exception:
            html = page.content()
            browser.close()
            data = static_parse(html, SELECTORS)
            if data:
                data["url"] = url
            return data
