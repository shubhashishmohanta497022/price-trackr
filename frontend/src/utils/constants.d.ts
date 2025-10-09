export declare const SUPPORTED_PLATFORMS: {
    readonly amazon: {
        readonly name: "Amazon";
        readonly domain: "amazon.in";
        readonly color: "#FF9900";
        readonly logo: "/logos/amazon.png";
    };
    readonly flipkart: {
        readonly name: "Flipkart";
        readonly domain: "flipkart.com";
        readonly color: "#2874F0";
        readonly logo: "/logos/flipkart.png";
    };
    readonly myntra: {
        readonly name: "Myntra";
        readonly domain: "myntra.com";
        readonly color: "#FF3F6C";
        readonly logo: "/logos/myntra.png";
    };
    readonly croma: {
        readonly name: "Croma";
        readonly domain: "croma.com";
        readonly color: "#12DAA8";
        readonly logo: "/logos/croma.png";
    };
    readonly ajio: {
        readonly name: "Ajio";
        readonly domain: "ajio.com";
        readonly color: "#D42C20";
        readonly logo: "/logos/ajio.png";
    };
};
export declare const CURRENCY_SYMBOLS: {
    readonly INR: "₹";
    readonly USD: "$";
    readonly EUR: "€";
    readonly GBP: "£";
};
export declare const API_ENDPOINTS: {
    readonly PRODUCTS: "/api/products";
    readonly ALERTS: "/api/alerts";
    readonly SALES: "/api/sales";
    readonly USERS: "/api/users";
    readonly AUTH: "/api/auth";
};
export declare const PRICE_CHANGE_THRESHOLDS: {
    readonly SMALL: 5;
    readonly MEDIUM: 15;
    readonly LARGE: 30;
};
export declare const WEBSOCKET_EVENTS: {
    readonly PRICE_UPDATE: "price_update";
    readonly PRODUCT_ADDED: "product_added";
    readonly SALE_DETECTED: "sale_detected";
    readonly ALERT_TRIGGERED: "alert_triggered";
};
export declare const LOCAL_STORAGE_KEYS: {
    readonly ACCESS_TOKEN: "access_token";
    readonly USER_DATA: "user_data";
    readonly THEME: "theme";
    readonly SETTINGS: "settings";
};
export declare const NOTIFICATION_TYPES: {
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly WARNING: "warning";
    readonly INFO: "info";
};
export declare const PRODUCT_AVAILABILITY: {
    readonly IN_STOCK: "In Stock";
    readonly OUT_OF_STOCK: "Out of Stock";
    readonly LIMITED_STOCK: "Limited Stock";
    readonly UNKNOWN: "Unknown";
};
//# sourceMappingURL=constants.d.ts.map