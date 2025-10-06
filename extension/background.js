// Background script for Price Trackr extension

// Listen for extension install/update
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Price Trackr installed/updated:', details.reason);

  // Set up context menu
  chrome.contextMenus.create({
    id: 'trackPrice',
    title: 'Track this product price',
    contexts: ['page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'trackPrice') {
    // Send message to content script to extract product info
    chrome.tabs.sendMessage(tab.id, {
      action: 'extractProduct'
    });
  }
});

// Listen for messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addProduct') {
    // Send product data to Price Trackr API
    addProductToTracker(request.productData)
      .then(response => {
        sendResponse({ success: true, data: response });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keep message channel open for async response
  }

  if (request.action === 'checkSupported') {
    const isSupported = isSupportedSite(request.url);
    sendResponse({ supported: isSupported });
  }
});

// Function to add product to Price Trackr
async function addProductToTracker(productData) {
  try {
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Check if current site is supported
function isSupportedSite(url) {
  const supportedDomains = [
    'amazon.in',
    'amazon.com',
    'flipkart.com',
    'myntra.com',
    'croma.com',
    'ajio.com'
  ];

  return supportedDomains.some(domain => url.includes(domain));
}

// Set up periodic price checking (daily)
chrome.alarms.create('checkPrices', { delayInMinutes: 1, periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkPrices') {
    console.log('Checking prices...');
    // This would trigger price checks for tracked products
  }
});
