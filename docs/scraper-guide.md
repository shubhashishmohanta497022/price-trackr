# Scraper Development Guide

## Overview

This guide explains how to develop and maintain scrapers for Price Trackr. Scrapers are responsible for extracting product information from e-commerce websites.

## Architecture

### Base Scraper Class

All scrapers inherit from `BaseScraper` which provides:
- Playwright browser management
- Anti-bot detection handling
- Common utility methods
- Error handling framework

### Scraper Structure

```python
from ..base_scraper import BaseScraper
from ..utils.parser import parser

class MyPlatformScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.domains = ['myplatform.com']

    def can_scrape(self, url: str) -> bool:
        domain = self.extract_domain(url)
        return 'myplatform.com' in domain

    async def scrape_product(self, url: str) -> Dict[str, Any]:
        # Implementation here
        pass
```

## Adding New Scrapers

### 1. Create Scraper File

Create a new file in `worker/playwright_scraper/scrapers/` following the naming convention `platform_name.py`.

### 2. Implement Required Methods

#### `can_scrape(url: str) -> bool`
Determines if this scraper can handle the given URL.

```python
def can_scrape(self, url: str) -> bool:
    domain = self.extract_domain(url)
    return any(d in domain for d in self.domains)
```

#### `scrape_product(url: str) -> Dict[str, Any]`
Main scraping logic. Must return a dictionary with:

```python
{
    'name': str,              # Product name
    'price': float,           # Current price
    'original_price': float,  # Original price (for sales)
    'availability': str,      # Stock status
    'image_url': str,         # Product image URL
    'description': str,       # Product description
    'platform': str,          # Platform identifier  
    'scraped_at': float       # Timestamp
}
```

### 3. Element Selection Strategy

Use multiple selectors for robustness:

```python
# Try multiple selectors for name
name_selectors = [
    '.product-title',
    'h1.title',
    '.product-name'
]
name = ""
for selector in name_selectors:
    name = await self.safe_get_text(selector)
    if name:
        break
```

### 4. Price Extraction

Use the parser utility for consistent price handling:

```python
price_text = await self.safe_get_text('.price')
current_price = parser.clean_price(price_text)
```

### 5. Error Handling

Wrap scraping logic in try-catch blocks:

```python
try:
    await self.page.goto(url, wait_until='networkidle', timeout=30000)
    await self.handle_bot_detection()

    # Scraping logic here

except Exception as e:
    logger.error(f"Error scraping {platform} product {url}: {e}")
    raise Exception(f"Failed to scrape {platform} product: {str(e)}")
```

## Best Practices

### 1. Robust Element Selection
- Use multiple selector strategies
- Prefer data attributes over classes when available
- Test selectors regularly as sites change

### 2. Bot Detection Handling
- Add random delays
- Use realistic user agents
- Handle CAPTCHAs gracefully
- Monitor for detection patterns

### 3. Performance Optimization
- Block unnecessary resources (images, CSS)
- Use networkidle wait state
- Implement reasonable timeouts

### 4. Data Validation
- Validate extracted data
- Handle missing information gracefully
- Use consistent data formats

### 5. Error Recovery
- Implement retry logic
- Log detailed error information
- Fail gracefully with meaningful errors

## Testing Scrapers

### Unit Testing

```python
import pytest
from scrapers.my_platform import MyPlatformScraper

@pytest.mark.asyncio
async def test_scraper():
    scraper = MyPlatformScraper()

    async with scraper:
        result = await scraper.scrape_product('https://myplatform.com/product/123')

    assert result['name']
    assert result['price'] > 0
    assert result['platform'] == 'myplatform'
```

### Manual Testing

1. Test with various product URLs
2. Verify all data fields are populated
3. Check price parsing accuracy
4. Test error handling with invalid URLs

## Common Challenges

### 1. Dynamic Content Loading
- Use appropriate wait strategies
- Wait for specific elements to load
- Handle single-page applications

### 2. Anti-Bot Measures
- Rotate user agents
- Use proxy servers when needed
- Implement human-like behavior

### 3. Site Structure Changes
- Monitor scraper health
- Implement alerts for failures
- Regular maintenance updates

### 4. Rate Limiting
- Implement delays between requests
- Respect robots.txt
- Use distributed scraping

## Maintenance

### Monitoring
- Track scraper success rates
- Monitor for structure changes
- Set up health checks

### Updates
- Regular selector updates
- Performance optimizations
- New feature additions

### Documentation
- Document selector changes
- Update test cases
- Maintain compatibility notes

## Platform-Specific Notes

### Amazon
- Multiple price selectors due to A/B testing
- Handle different page layouts
- Deal with region-specific changes

### Flipkart
- Login popups need handling
- Dynamic price loading
- Multiple product page formats

### Myntra
- Image lazy loading
- Size/variant handling
- Fashion-specific attributes

### Croma
- Electronics-specific data
- Availability variations
- Promotional pricing

### Ajio
- Fashion focus
- Brand-specific layouts
- Size chart integration

## Troubleshooting

### Common Issues

1. **Empty Results**: Check if selectors still exist
2. **Bot Detection**: Update anti-detection measures
3. **Timeout Errors**: Increase wait times or optimize loading
4. **Price Parsing**: Verify currency formats and number handling

### Debugging Tools

- Browser developer tools
- Playwright inspector
- Screenshot on error
- Network request logging

## Performance Metrics

Track these metrics for each scraper:
- Success rate
- Average response time
- Error frequency
- Data accuracy

## Security Considerations

- Don't store sensitive data
- Use secure connections
- Respect privacy policies
- Implement rate limiting
