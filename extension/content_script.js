// Content script for Price Trackr extension

console.log('Price Trackr content script loaded');

// Inject floating action button
let floatingButton = null;

function createFloatingButton() {
  if (floatingButton) return;

  floatingButton = document.createElement('div');
  floatingButton.id = 'price-trackr-fab';
  floatingButton.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
      transition: all 0.3s ease;
      font-family: Arial, sans-serif;
    " title="Track this product with Price Trackr">
      PT
    </div>
  `;

  floatingButton.addEventListener('click', handleTrackProduct);
  floatingButton.addEventListener('mouseenter', () => {
    floatingButton.style.transform = 'scale(1.1)';
  });
  floatingButton.addEventListener('mouseleave', () => {
    floatingButton.style.transform = 'scale(1)';
  });

  document.body.appendChild(floatingButton);
}

// Extract product information based on platform
function extractProductInfo() {
  const url = window.location.href;
  const platform = detectPlatform(url);

  if (!platform) {
    return null;
  }

  let productInfo = {
    url: url,
    platform: platform,
    name: '',
    price: null,
    image_url: '',
    description: ''
  };

  try {
    switch (platform) {
      case 'amazon':
        productInfo = extractAmazonProduct();
        break;
      case 'flipkart':
        productInfo = extractFlipkartProduct();
        break;
      case 'myntra':
        productInfo = extractMyntraProduct();
        break;
      case 'croma':
        productInfo = extractCromaProduct();
        break;
      case 'ajio':
        productInfo = extractAjioProduct();
        break;
    }
  } catch (error) {
    console.error('Error extracting product info:', error);
  }

  return productInfo;
}

function detectPlatform(url) {
  if (url.includes('amazon')) return 'amazon';
  if (url.includes('flipkart')) return 'flipkart';
  if (url.includes('myntra')) return 'myntra';
  if (url.includes('croma')) return 'croma';
  if (url.includes('ajio')) return 'ajio';
  return null;
}

function extractAmazonProduct() {
  const name = document.querySelector('#productTitle')?.textContent?.trim() || '';
  const priceElement = document.querySelector('.a-price-whole') || document.querySelector('.a-offscreen');
  const price = priceElement ? cleanPrice(priceElement.textContent) : null;
  const image_url = document.querySelector('#landingImage')?.src || '';

  return {
    url: window.location.href,
    platform: 'amazon',
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}

function extractFlipkartProduct() {
  const name = document.querySelector('.B_NuCI')?.textContent?.trim() || '';
  const priceElement = document.querySelector('._30jeq3._16Jk6d');
  const price = priceElement ? cleanPrice(priceElement.textContent) : null;
  const image_url = document.querySelector('._396cs4._2amPTt._3qGmMb img')?.src || '';

  return {
    url: window.location.href,
    platform: 'flipkart',
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}

function extractMyntraProduct() {
  const name = document.querySelector('.pdp-name')?.textContent?.trim() || '';
  const priceElement = document.querySelector('.pdp-price strong');
  const price = priceElement ? cleanPrice(priceElement.textContent) : null;
  const image_url = document.querySelector('.image-grid-image')?.src || '';

  return {
    url: window.location.href,
    platform: 'myntra',
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}

function extractCromaProduct() {
  const name = document.querySelector('.pdp-product-name')?.textContent?.trim() || '';
  const priceElement = document.querySelector('.pdp-price .amount');
  const price = priceElement ? cleanPrice(priceElement.textContent) : null;
  const image_url = document.querySelector('.product-image img')?.src || '';

  return {
    url: window.location.href,
    platform: 'croma',
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}

function extractAjioProduct() {
  const name = document.querySelector('.prod-name')?.textContent?.trim() || '';
  const priceElement = document.querySelector('.prod-sp');
  const price = priceElement ? cleanPrice(priceElement.textContent) : null;
  const image_url = document.querySelector('.rilrtl-lazy-img')?.src || '';

  return {
    url: window.location.href,
    platform: 'ajio',
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}

function cleanPrice(priceText) {
  if (!priceText) return null;
  const cleaned = priceText.replace(/[^0-9.,]/g, '').replace(/,/g, '');
  return parseFloat(cleaned) || null;
}

function handleTrackProduct() {
  const productInfo = extractProductInfo();

  if (!productInfo || !productInfo.name) {
    showNotification('Could not extract product information', 'error');
    return;
  }

  // Send to background script
  chrome.runtime.sendMessage({
    action: 'addProduct',
    productData: productInfo
  }, (response) => {
    if (response && response.success) {
      showNotification('Product added to tracking!', 'success');
    } else {
      showNotification('Failed to add product', 'error');
    }
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 10001;
    font-family: Arial, sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractProduct') {
    handleTrackProduct();
  }
});

// Initialize floating button when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createFloatingButton, 1000);
  });
} else {
  setTimeout(createFloatingButton, 1000);
}
