# Storefront API Specification

This repository includes a working backend implementation, but for the purpose of the assignment it must be treated as a black-box service contract.

The service also exposes Swagger UI when the backend is running locally:

- `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/docs/openapi.json`

## Authentication Model

- Authentication uses an HttpOnly cookie named `session`.
- The cookie is set by `POST /api/auth/login`.
- The cookie is cleared by `POST /api/auth/logout`.
- The cookie is required for:
  - `GET /api/auth/me`
  - `GET /api/cart`
  - `POST /api/cart/items`
- The cookie is not available to frontend JavaScript through `document.cookie`.

For local HTTP development, the backend uses cookie settings compatible with a local challenge environment. Different `SameSite` / `Secure` values may be required in real HTTPS production deployments.

## Seeded Test Account

- Email: `participant@example.com`
- Password: `Password123!`

## Data Shapes

### User

```json
{
  "id": 1,
  "email": "participant@example.com",
  "name": "Casey Participant"
}
```

### Product

```json
{
  "id": 3,
  "name": "Analog Desk Clock",
  "description": "Quiet movement, matte brass frame, readable face.",
  "priceCents": 4800,
  "stock": 11
}
```

### Cart Item

```json
{
  "id": 9,
  "quantity": 2,
  "product": {
    "id": 3,
    "name": "Analog Desk Clock",
    "description": "Quiet movement, matte brass frame, readable face.",
    "priceCents": 4800,
    "stock": 11
  }
}
```

## Endpoints

## `POST /api/auth/login`

Logs a user in and sets the `session` cookie.

Request:

```json
{
  "email": "participant@example.com",
  "password": "Password123!"
}
```

Success response:

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "participant@example.com",
    "name": "Casey Participant"
  }
}
```

Failure response:

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

## `POST /api/auth/logout`

Clears the `session` cookie.

Success response:

```json
{
  "success": true
}
```

## `GET /api/auth/me`

Returns the authenticated user associated with the `session` cookie.

Success response:

```json
{
  "user": {
    "id": 1,
    "email": "participant@example.com",
    "name": "Casey Participant"
  }
}
```

Failure response:

```json
{
  "statusCode": 401,
  "message": "Authentication required",
  "error": "Unauthorized"
}
```

## `GET /api/products`

Returns the storefront product list. This endpoint is public.

Success response:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Wool Throw Blanket",
      "description": "Soft merino blend for cool evenings.",
      "priceCents": 8900,
      "stock": 7
    }
  ]
}
```

## `GET /api/cart`

Returns the authenticated user's cart state.

Success response:

```json
{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "product": {
        "id": 3,
        "name": "Analog Desk Clock",
        "description": "Quiet movement, matte brass frame, readable face.",
        "priceCents": 4800,
        "stock": 11
      }
    }
  ],
  "totalQuantity": 2,
  "totalPriceCents": 9600
}
```

## `POST /api/cart/items`

Adds a product to the authenticated user's cart or increments quantity for an existing item.

Request:

```json
{
  "productId": 3,
  "quantity": 1
}
```

Success response:

```json
{
  "items": [
    {
      "id": 1,
      "quantity": 3,
      "product": {
        "id": 3,
        "name": "Analog Desk Clock",
        "description": "Quiet movement, matte brass frame, readable face.",
        "priceCents": 4800,
        "stock": 11
      }
    }
  ],
  "totalQuantity": 3,
  "totalPriceCents": 14400
}
```

Failure conditions:

- unauthenticated request
- invalid payload
- unknown product
- requested quantity exceeds stock
