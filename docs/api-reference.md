# Price Trackr API Reference

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /users/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "is_active": true,
  "is_verified": false,
  "created_at": "2025-01-01T00:00:00Z"
}
```

#### POST /users/token
Login and get access token.

**Request Body (Form Data):**
- `username`: string
- `password`: string

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

#### GET /users/me
Get current user information.

**Headers:** Authorization required

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",  
  "username": "username",
  "is_active": true,
  "is_verified": false,
  "created_at": "2025-01-01T00:00:00Z"
}
```

### Products

#### GET /products
Get list of tracked products.

**Query Parameters:**
- `skip`: int (default: 0) - Number of records to skip
- `limit`: int (default: 100) - Maximum number of records to return

**Response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "url": "https://amazon.in/iphone-15-pro",
    "platform": "amazon",
    "current_price": 134900.0,
    "original_price": 134900.0,
    "image_url": "https://...",
    "description": "Latest iPhone model",
    "availability": "In Stock",
    "is_active": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": null,
    "user_id": 1
  }
]
```

#### POST /products
Add a new product to track.

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "url": "https://amazon.in/iphone-15-pro",
  "platform": "amazon",
  "description": "Latest iPhone model"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "url": "https://amazon.in/iphone-15-pro",
  "platform": "amazon",
  "current_price": null,
  "original_price": null,
  "image_url": null,
  "description": "Latest iPhone model",
  "availability": "Unknown",
  "is_active": true,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": null,
  "user_id": 1
}
```

#### GET /products/{product_id}
Get detailed information about a specific product, including price history.

**Response:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "url": "https://amazon.in/iphone-15-pro",
  "platform": "amazon",
  "current_price": 134900.0,
  "original_price": 134900.0,
  "image_url": "https://...",
  "description": "Latest iPhone model",
  "availability": "In Stock",
  "is_active": true,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": null,
  "user_id": 1,
  "price_logs": [
    {
      "id": 1,
      "product_id": 1,
      "price": 134900.0,
      "discount_percentage": 0.0,
      "availability": "In Stock",
      "timestamp": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### PUT /products/{product_id}
Update product information.

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "is_active": true
}
```

#### DELETE /products/{product_id}
Delete a tracked product.

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

#### GET /products/{product_id}/price-history
Get price history for a specific product.

**Query Parameters:**
- `limit`: int (default: 50) - Maximum number of price logs to return

**Response:**
```json
[
  {
    "id": 1,
    "product_id": 1,
    "price": 134900.0,
    "discount_percentage": 0.0,
    "availability": "In Stock",
    "timestamp": "2025-01-01T00:00:00Z"
  }
]
```

### Alerts

#### GET /alerts
Get user's price alerts.

**Response:**
```json
{
  "message": "Alerts endpoint - coming soon"
}
```

#### POST /alerts
Create a new price alert.

**Response:**
```json
{
  "message": "Create alert endpoint - coming soon"
}
```

#### DELETE /alerts/{alert_id}
Delete a price alert.

**Response:**
```json
{
  "message": "Delete alert {alert_id} endpoint - coming soon"
}
```

### Sales

#### GET /sales
Get current sales and deals.

**Response:**
```json
{
  "message": "Sales endpoint - coming soon"
}
```

#### GET /sales/trending
Get trending sales.

**Response:**
```json
{
  "message": "Trending sales endpoint - coming soon"
}
```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `500`: Internal Server Error

Error response format:
```json
{
  "detail": "Error message"
}
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## WebSocket

### Connection
```
ws://localhost:8000/ws
```

### Events
- `price_update`: Sent when product prices change
- `product_added`: Sent when new products are added
- `sale_detected`: Sent when sales are detected

### Message Format
```json
{
  "type": "price_update",
  "data": {
    "product_id": 1,
    "new_price": 129900.0,
    "old_price": 134900.0,
    "change_percentage": -3.7
  }
}
```
