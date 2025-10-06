📖 API Reference: Price Trackr
This document provides a detailed reference for the Price Trackr REST API.

Base URL: https://api.example.com

Interactive Documentation: For live, interactive API documentation, please visit:

Swagger UI: https://api.example.com/api/docs

ReDoc: https://api.example.com/api/redoc

Authentication
The API uses JWT (JSON Web Tokens) for authentication on protected endpoints.

Register: Create an account using the POST /api/v1/users/register endpoint.

Login: Send your email (as username) and password to the POST /api/v1/users/token endpoint.

Receive Token: A successful login will return an access_token.

Authorize Requests: Include this token in the Authorization header of subsequent requests as a Bearer token.

Example Header:

Authorization: Bearer <your_access_token>

Endpoints
Products
Endpoints for managing tracked products.

POST /api/v1/products/track
Adds a new product to be tracked by its URL. This queues a scraping job in the background.

Method: POST

Request Body:

{
  "url": "[https://www.amazon.in/dp/B09G952332](https://www.amazon.in/dp/B09G952332)"
}

Success Response (202 Accepted): Returns the newly created (or existing) product data.

{
  "id": 1,
  "url": "[https://www.amazon.in/dp/B09G952332](https://www.amazon.in/dp/B09G952332)",
  "title": "Tracking new product from www.amazon.in...",
  "brand": null,
  "image_url": null,
  "sku": null
}

GET /api/v1/products/
Retrieves a paginated list of all tracked products.

Method: GET

Query Parameters:

skip (integer, optional, default: 0): Number of products to skip.

limit (integer, optional, default: 100): Maximum number of products to return.

Success Response (200 OK):

[
  { "id": 1, "url": "...", "title": "..." },
  { "id": 2, "url": "...", "title": "..." }
]

GET /api/v1/products/{product_id}
Retrieves details for a single product, including its full price history.

Method: GET

Success Response (200 OK):

{
  "id": 1,
  "url": "[https://www.amazon.in/dp/B09G952332](https://www.amazon.in/dp/B09G952332)",
  "title": "Sony WH-1000XM5 Wireless Headphones",
  "brand": "Sony",
  "price_history": [
    {
      "id": 101,
      "product_id": 1,
      "price_cents": 2499000,
      "currency": "INR",
      "availability": "In Stock",
      "scraped_at": "2025-10-06T10:30:00Z"
    }
  ]
}

DELETE /api/v1/products/{product_id}
Deletes a product and all its associated data.

Method: DELETE

Success Response: 204 No Content

Users & Authentication
Endpoints for user registration, login, and managing watchlists.

POST /api/v1/users/register
Creates a new user account.

Method: POST

Request Body:

{
  "email": "user@example.com",
  "password": "a_strong_password"
}

Success Response (201 Created): Returns the new user's data (without password).

POST /api/v1/users/token
Authenticates a user and returns a JWT access token.

Method: POST

Request Body: application/x-www-form-urlencoded

username: The user's email address.

password: The user's password.

Success Response (200 OK):

{
  "access_token": "eyJhbGciOiJI...",
  "token_type": "bearer"
}

GET /api/v1/users/me
Retrieves the profile of the currently authenticated user.

Method: GET

Authentication: Required.

Success Response (200 OK): Returns the user's data, including their watchlist.

POST /api/v1/users/me/watchlist/{product_id}
Adds a product to the authenticated user's watchlist.

Method: POST

Authentication: Required.

Success Response (200 OK): Returns the updated user profile.

DELETE /api/v1/users/me/watchlist/{product_id}
Removes a product from the authenticated user's watchlist.

Method: DELETE

Authentication: Required.

Success Response (200 OK): Returns the updated user profile.

Sales
Endpoints for discovering e-commerce sales events.

GET /api/v1/sales/
Retrieves a list of ongoing and upcoming sales.

Method: GET

Success Response (200 OK):

[
  {
    "id": 1,
    "title": "Great Indian Festival",
    "store": "Amazon",
    "discount_summary": "Up to 80% off",
    "status": "ongoing",
    "category": "Electronics"
  }
]

WebSocket
Endpoint for real-time updates.

GET /ws/updates
Establishes a WebSocket connection.

URL: wss://ws.example.com/ws/updates

Protocol: WebSocket

Behavior: The server will push messages to the client when a price is updated. The client does not need to send any messages.

Message Format (Server -> Client):

{
  "event": "price_update",
  "data": {
    "product_id": 1,
    "new_price_cents": 2299000,
    "currency": "INR",
    "availability": "In Stock"
  }
}
