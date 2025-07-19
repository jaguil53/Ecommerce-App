# Express App README

This README provides information about setting up and running the Express app for your project, as well as details about the available routes.

## Getting Started

To get the app up and running, follow these steps:

1. Install the dependencies:
   
   `npm install`
   
2. Start the app:
   
   `npm start`
   
3. The app should now be running on `http://localhost:8080`.


## Routes

Here's an overview of the available routes in the project:

### User Routes

- `POST /api/v1/users`: Register a new user.
- `POST /api/v1/users/login`: Log in a user.
- `GET /api/v1/users/logout`: Log out a user (requires authentication).
- `GET /api/v1/users/:id`: Fetch user details by ID (requires authentication).
- `DELETE /api/v1/users/:id`: Delete a user by ID (requires authentication and admin privileges).
- `PUT /api/v1/users/:id`: Edit user details by ID (requires authentication).
- `GET /api/v1/users`: Fetch all users (requires authentication and admin privileges).

### Product Routes

- `POST /api/v1/products`: Create a new product (requires authentication and admin privileges).
- `PUT /api/v1/products/:id`: Edit product details by ID (requires authentication and admin privileges).
- `DELETE /api/v1/products/:id`: Delete a product by ID (requires authentication and admin privileges).
- `GET /api/v1/products/:id`: Fetch product details by ID.
- `GET /api/v1/products`: Fetch all products.

### Cart Routes

- `POST /api/v1/carts`: Save a product in the cart (requires authentication).
- `GET /api/v1/carts`: Fetch user's cart (requires authentication).
- `DELETE /api/v1/carts/:id`: Delete a product from the cart (requires authentication).

### Category Routes

- `POST /api/v1/categories`: Create a new category (requires authentication and admin privileges).
- `PUT /api/v1/categories/:id`: Edit category details by ID (requires authentication and admin privileges).
- `DELETE /api/v1/categories/:id`: Delete a category by ID (requires authentication and admin privileges).
- `GET /api/v1/categories/:id`: Fetch category details by ID.
- `GET /api/v1/categories`: Fetch all categories.

### Order Routes

- `POST /api/v1/orders`: Place a new order (requires authentication).
- `GET /api/v1/orders/user/:userId`: Fetch order history of a user (requires authentication).
- `GET /api/v1/orders`: Fetch order history of all users (requires authentication and admin privileges).
- `PUT /api/v1/orders/:orderId`: Change order status by ID (requires authentication and admin privileges).