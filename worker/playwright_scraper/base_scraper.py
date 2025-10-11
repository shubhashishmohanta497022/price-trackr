from bs4 import BeautifulSoup
import re

def to_minor(price_text: str, currency: str="INR") -> int:
    # Extract numeric and convert to paise/cents
    nums = re.findall(r"[0-9]+(?:[\\.,][0-9]{1,2})?", price_text.replace(",", ""))
    if not nums: return 0
    v = float(nums[0])
    return int(round(v * 100))

def static_parse(html: str, selectors: dict) -> dict | None:
    soup = BeautifulSoup(html, "lxml")
    title_el = soup.select_one(selectors.get("title") or "title")
    price_el = soup.select_one(selectors.get("price") or "")
    avail_el = soup.select_one(selectors.get("availability") or "")
    if not price_el: return None
    return {
        "title": (title_el.get_text(strip=True) if title_el else "Unknown"),
        "price": to_minor(price_el.get_text()),
        "currency": "INR",
        "availability": (avail_el.get_text(strip=True) if avail_el else None),
    }
