export const SUPPORTED_PLATFORMS = {
    amazon: {
        name: 'Amazon',
        domain: 'amazon.in',
        color: '#FF9900',
        logo: '/logos/amazon.png',
    },
    flipkart: {
        name: 'Flipkart',
        domain: 'flipkart.com',
        color: '#2874F0',
        logo: '/logos/flipkart.png',
    },
    myntra: {
        name: 'Myntra',
        domain: 'myntra.com',
        color: '#FF3F6C',
        logo: '/logos/myntra.png',
    },
    croma: {
        name: 'Croma',
        domain: 'croma.com',
        color: '#12DAA8',
        logo: '/logos/croma.png',
    },
    ajio: {
        name: 'Ajio',
        domain: 'ajio.com',
        color: '#D42C20',
        logo: '/logos/ajio.png',
    },
};
export const CURRENCY_SYMBOLS = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
};
export const API_ENDPOINTS = {
    PRODUCTS: '/api/products',
    ALERTS: '/api/alerts',
    SALES: '/api/sales',
    USERS: '/api/users',
    AUTH: '/api/auth',
};
export const PRICE_CHANGE_THRESHOLDS = {
    SMALL: 5, // 5%
    MEDIUM: 15, // 15%
    LARGE: 30, // 30%
};
export const WEBSOCKET_EVENTS = {
    PRICE_UPDATE: 'price_update',
    PRODUCT_ADDED: 'product_added',
    SALE_DETECTED: 'sale_detected',
    ALERT_TRIGGERED: 'alert_triggered',
};
export const LOCAL_STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    USER_DATA: 'user_data',
    THEME: 'theme',
    SETTINGS: 'settings',
};
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};
export const PRODUCT_AVAILABILITY = {
    IN_STOCK: 'In Stock',
    OUT_OF_STOCK: 'Out of Stock',
    LIMITED_STOCK: 'Limited Stock',
    UNKNOWN: 'Unknown',
};
//# sourceMappingURL=constants.js.map