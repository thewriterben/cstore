# API Endpoints Documentation

Complete API endpoint reference for CStore cryptocurrency marketplace.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "data": {},
  "message": "Optional message",
  "pagination": {} // For paginated endpoints
}
```

---

## Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Auth Required:** No
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login
- **POST** `/auth/login`
- **Auth Required:** No
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get Current User
- **GET** `/auth/me`
- **Auth Required:** Yes

### Update Password
- **PUT** `/auth/password`
- **Auth Required:** Yes
- **Body:**
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```

---

## Product Endpoints

### Get All Products
- **GET** `/products`
- **Auth Required:** No
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 12)
  - `category` - Filter by category ID
  - `minPrice` - Minimum price in USD
  - `maxPrice` - Maximum price in USD
  - `search` - Search term
  - `sort` - Sort field (e.g., 'price', '-createdAt')

### Get Single Product
- **GET** `/products/:id`
- **Auth Required:** No

### Create Product (Admin)
- **POST** `/products`
- **Auth Required:** Yes (Admin)
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 0.001,
    "priceUSD": 50,
    "currency": "BTC",
    "category": "category_id",
    "stock": 100,
    "image": "/images/product.jpg"
  }
  ```

### Update Product (Admin)
- **PUT** `/products/:id`
- **Auth Required:** Yes (Admin)

### Delete Product (Admin)
- **DELETE** `/products/:id`
- **Auth Required:** Yes (Admin)

---

## Order Endpoints

### Create Order
- **POST** `/orders`
- **Auth Required:** Optional (Guest checkout supported)
- **Body:**
  ```json
  {
    "productId": "product_id",
    "quantity": 1,
    "customerEmail": "customer@example.com",
    "cryptocurrency": "BTC",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA"
    }
  }
  ```

### Get Order
- **GET** `/orders/:id`
- **Auth Required:** Optional

### Get My Orders
- **GET** `/orders/my-orders`
- **Auth Required:** Yes

### Get All Orders (Admin)
- **GET** `/orders`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Items per page
  - `status` - Filter by status

### Update Order Status (Admin)
- **PUT** `/orders/:id/status`
- **Auth Required:** Yes (Admin)
- **Body:**
  ```json
  {
    "status": "confirmed|processing|shipped|delivered|cancelled"
  }
  ```

---

## Payment Endpoints

### Confirm Payment
- **POST** `/payments/confirm`
- **Auth Required:** No
- **Body:**
  ```json
  {
    "orderId": "order_id",
    "transactionHash": "0x..."
  }
  ```

### Get Payment by Order
- **GET** `/payments/order/:orderId`
- **Auth Required:** No

### Get All Payments (Admin)
- **GET** `/payments`
- **Auth Required:** Yes (Admin)

### Verify Payment (Admin)
- **POST** `/payments/:id/verify`
- **Auth Required:** Yes (Admin)

---

## Review Endpoints

### Create Review
- **POST** `/reviews`
- **Auth Required:** Yes
- **Body:**
  ```json
  {
    "productId": "product_id",
    "orderId": "order_id",
    "rating": 5,
    "title": "Great product!",
    "comment": "Really enjoyed this product. Highly recommend!"
  }
  ```

### Get Product Reviews
- **GET** `/reviews/product/:productId`
- **Auth Required:** No
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Items per page
  - `sort` - Sort order (e.g., '-createdAt', 'rating')

### Get Review Stats
- **GET** `/reviews/product/:productId/stats`
- **Auth Required:** No
- **Returns:** Total reviews, average rating, rating distribution

### Get Single Review
- **GET** `/reviews/:id`
- **Auth Required:** No

### Get My Reviews
- **GET** `/reviews/my-reviews`
- **Auth Required:** Yes

### Update Review
- **PUT** `/reviews/:id`
- **Auth Required:** Yes (Owner only)
- **Body:**
  ```json
  {
    "rating": 4,
    "title": "Updated title",
    "comment": "Updated comment"
  }
  ```

### Delete Review
- **DELETE** `/reviews/:id`
- **Auth Required:** Yes (Owner or Admin)

### Mark Review as Helpful
- **PUT** `/reviews/:id/helpful`
- **Auth Required:** No

### Approve Review (Admin)
- **PUT** `/reviews/:id/approve`
- **Auth Required:** Yes (Admin)
- **Body:**
  ```json
  {
    "isApproved": true
  }
  ```

---

## Category Endpoints

### Get All Categories
- **GET** `/categories`
- **Auth Required:** No
- **Query Parameters:**
  - `isActive` - Filter by active status
  - `sort` - Sort order

### Get Single Category
- **GET** `/categories/:id`
- **Auth Required:** No

### Get Category by Slug
- **GET** `/categories/slug/:slug`
- **Auth Required:** No

### Get Category Products
- **GET** `/categories/:id/products`
- **Auth Required:** No
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Items per page
  - `sort` - Sort order
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price

### Create Category (Admin)
- **POST** `/categories`
- **Auth Required:** Yes (Admin)
- **Body:**
  ```json
  {
    "name": "Electronics",
    "description": "Electronic products",
    "image": "/images/category.jpg",
    "displayOrder": 1
  }
  ```

### Update Category (Admin)
- **PUT** `/categories/:id`
- **Auth Required:** Yes (Admin)

### Delete Category (Admin)
- **DELETE** `/categories/:id`
- **Auth Required:** Yes (Admin)

---

## Shopping Cart Endpoints

### Get Cart
- **GET** `/cart`
- **Auth Required:** Yes

### Add to Cart
- **POST** `/cart/items`
- **Auth Required:** Yes
- **Body:**
  ```json
  {
    "productId": "product_id",
    "quantity": 1
  }
  ```

### Update Cart Item
- **PUT** `/cart/items/:productId`
- **Auth Required:** Yes
- **Body:**
  ```json
  {
    "quantity": 2
  }
  ```

### Remove from Cart
- **DELETE** `/cart/items/:productId`
- **Auth Required:** Yes

### Clear Cart
- **DELETE** `/cart`
- **Auth Required:** Yes

### Validate Cart
- **POST** `/cart/validate`
- **Auth Required:** Yes
- **Returns:** Cart validation status, stock availability, price changes

---

## Admin Dashboard Endpoints

All admin endpoints require Admin role authentication.

### Dashboard Statistics
- **GET** `/admin/dashboard/stats`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `startDate` - Filter start date
  - `endDate` - Filter end date
- **Returns:** Overview stats, recent orders, top products

### User Management

#### Get All Users
- **GET** `/admin/users`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Items per page
  - `role` - Filter by role
  - `search` - Search term

#### Get User Details
- **GET** `/admin/users/:id`
- **Auth Required:** Yes (Admin)

#### Update User Role
- **PUT** `/admin/users/:id/role`
- **Auth Required:** Yes (Admin)
- **Body:**
  ```json
  {
    "role": "admin|user"
  }
  ```

#### Delete User
- **DELETE** `/admin/users/:id`
- **Auth Required:** Yes (Admin)

### Analytics

#### Sales Analytics
- **GET** `/admin/analytics/sales`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `period` - Time period (7d, 30d, 90d, 1y)
- **Returns:** Sales by date, sales by cryptocurrency, average order value

#### Product Analytics
- **GET** `/admin/analytics/products`
- **Auth Required:** Yes (Admin)
- **Returns:** Low stock products, out of stock products, most reviewed products

### Reviews Moderation

#### Get Pending Reviews
- **GET** `/admin/reviews/pending`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Items per page

### System

#### System Health
- **GET** `/admin/system/health`
- **Auth Required:** Yes (Admin)
- **Returns:** Database status, email service status, memory usage, uptime

#### Activity Log
- **GET** `/admin/activity`
- **Auth Required:** Yes (Admin)
- **Query Parameters:**
  - `limit` - Number of activities to return
- **Returns:** Recent orders, reviews, and user registrations

---

## Utility Endpoints

### Get Cryptocurrencies
- **GET** `/cryptocurrencies`
- **Auth Required:** No
- **Returns:** List of supported cryptocurrencies and wallet addresses

### Health Check
- **GET** `/health`
- **Auth Required:** No
- **Returns:** Server status and timestamp

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes

---

## Pagination

Paginated endpoints return the following pagination object:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```
