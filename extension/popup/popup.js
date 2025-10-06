// Popup script for Price Trackr extension

document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const supportedSiteEl = document.getElementById('supported-site');
  const unsupportedSiteEl = document.getElementById('unsupported-site');
  const trackBtn = document.getElementById('track-btn');
  const openDashboardBtn = document.getElementById('open-dashboard');

  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if site is supported
    const response = await chrome.runtime.sendMessage({
      action: 'checkSupported',
      url: tab.url
    });

    loadingEl.style.display = 'none';

    if (response.supported) {
      // Site is supported, try to extract product info
      showSupportedSite(tab);
    } else {
      // Site not supported
      unsupportedSiteEl.style.display = 'block';
    }
  } catch (error) {
    console.error('Error in popup:', error);
    loadingEl.style.display = 'none';
    unsupportedSiteEl.style.display = 'block';
  }

  // Event listeners
  trackBtn.addEventListener('click', handleTrackProduct);
  openDashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
    window.close();
  });
});

async function showSupportedSite(tab) {
  const supportedSiteEl = document.getElementById('supported-site');

  try {
    // Inject content script to extract product info
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractProductFromPage
    });

    const productInfo = results[0].result;

    if (productInfo && productInfo.name) {
      // Update UI with product info
      document.getElementById('product-name').textContent = productInfo.name;
      document.getElementById('product-price').textContent = 
        productInfo.price ? `₹${productInfo.price}` : 'Price not available';

      if (productInfo.image_url) {
        document.getElementById('product-img').src = productInfo.image_url;
      }

      // Store product info for tracking
      window.currentProduct = productInfo;
    }

    supportedSiteEl.style.display = 'block';
  } catch (error) {
    console.error('Error extracting product info:', error);
    document.getElementById('unsupported-site').style.display = 'block';
  }
}

async function handleTrackProduct() {
  const trackBtn = document.getElementById('track-btn');
  const btnText = trackBtn.querySelector('.btn-text');
  const loader = trackBtn.querySelector('.loader');

  if (!window.currentProduct) {
    showMessage('No product information available', 'error');
    return;
  }

  // Show loading state
  btnText.style.display = 'none';
  loader.style.display = 'inline-block';
  trackBtn.disabled = true;

  try {
    const response = await chrome.runtime.sendMessage({
      action: 'addProduct',
      productData: window.currentProduct
    });

    if (response.success) {
      showMessage('Product added to tracking!', 'success');
      btnText.textContent = 'Added ✓';
    } else {
      throw new Error(response.error || 'Failed to add product');
    }
  } catch (error) {
    console.error('Error tracking product:', error);
    showMessage('Failed to add product', 'error');
  } finally {
    // Reset button state
    loader.style.display = 'none';
    btnText.style.display = 'inline-block';
    trackBtn.disabled = false;
  }
}

function showMessage(message, type) {
  // Create and show message element
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;

  document.querySelector('.container').insertBefore(
    messageEl, 
    document.querySelector('.main')
  );

  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

// Function to be injected into page context
function extractProductFromPage() {
  function detectPlatform(url) {
    if (url.includes('amazon')) return 'amazon';
    if (url.includes('flipkart')) return 'flipkart';
    if (url.includes('myntra')) return 'myntra';
    if (url.includes('croma')) return 'croma';
    if (url.includes('ajio')) return 'ajio';
    return null;
  }

  function cleanPrice(priceText) {
    if (!priceText) return null;
    const cleaned = priceText.replace(/[^0-9.,]/g, '').replace(/,/g, '');
    return parseFloat(cleaned) || null;
  }

  const url = window.location.href;
  const platform = detectPlatform(url);

  if (!platform) return null;

  let name = '';
  let price = null;
  let image_url = '';

  try {
    switch (platform) {
      case 'amazon':
        name = document.querySelector('#productTitle')?.textContent?.trim() || '';
        const amazonPrice = document.querySelector('.a-price-whole') || 
                           document.querySelector('.a-offscreen');
        price = amazonPrice ? cleanPrice(amazonPrice.textContent) : null;
        image_url = document.querySelector('#landingImage')?.src || '';
        break;

      case 'flipkart':
        name = document.querySelector('.B_NuCI')?.textContent?.trim() || '';
        const flipkartPrice = document.querySelector('._30jeq3._16Jk6d');
        price = flipkartPrice ? cleanPrice(flipkartPrice.textContent) : null;
        image_url = document.querySelector('._396cs4._2amPTt._3qGmMb img')?.src || '';
        break;

      // Add other platforms...
    }
  } catch (error) {
    console.error('Error extracting product:', error);
  }

  return {
    url: url,
    platform: platform,
    name: name,
    price: price,
    image_url: image_url,
    description: name
  };
}
