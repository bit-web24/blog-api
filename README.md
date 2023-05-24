# Blog API Documentation

Welcome to the documentation for the Blog API. This API provides various endpoints for user authentication, user management, and managing blog posts.

## Table of Contents

- [API Overview](#api-overview)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Blog Posts](#blog-posts)
- [Testing](#testing)
- [Examples](#examples)

## API Overview

The Blog API is built using Express.js and MongoDB. It follows RESTful principles and provides the following functionality:

- User registration and login
- User management (viewing all users, getting a user by ID, deleting a user)
- Retrieving, creating, updating, and deleting blog posts
- User authentication using username and password

## Getting Started

To set up and run the API locally, follow these steps:

1. Clone the repository:

  ```bash
   git clone <repository-url>
  ```

2. Install dependencies:

```bash
cd blog-api
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and provide the following variables:

```env
PORT=3000
ATLAS_KEY=<your-mongodb-uri>
SECRET_KEY=<your-secret-key>
```

4. Start the server:

```bash
npm start
```

> The API will be accessible at http://localhost:3000.

## Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user. Required parameters: `username` and `password`.
- `POST /api/auth/login`: Log in an existing user. Required parameters: `username` and `password`.

### Users
- `GET /api/users`: Retrieve all users. Requires authentication.
- `GET /api/users/:id`: Retrieve a specific user by ID. Requires authentication.
- `DELETE /api/users/:id`: Delete a specific user by ID. Requires authentication.

### Blog Posts
- `GET /api/posts`: Retrieve all blog posts. Requires authentication.
- `GET /api/posts/:id`: Retrieve a specific blog post by ID. Requires authentication.
- `POST /api/posts`: Create a new blog post. Requires authentication. Required parameters: `title` and `content`.
- `PUT /api/posts/:id`: Update an existing blog post by ID. Requires authentication. Required parameters: `title` and `content`.
- `DELETE /api/posts/:id`: Delete a specific blog post by ID. Requires authentication.

## Testing
To run the tests for the API, follow these steps:

1. Make sure the API server is `NOT` running.

2. Run the tests:

  ```bash
  npm test
  ```

This will execute the test cases and provide the test results, including any failures or errors.

Note: The tests assume a test database is set up and will not modify the production database.

# Examples

## Authentication
Register a new user
  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Request body**:
    ```json
    {
      "username": "john_doe",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
Log in an existing user
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request body**:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

- **Response**:
```json
{
  "message": "Login successful",
  "token": "<access-token>"
}
```

## Users
Retrieve all users
- **URL**: `/api/users`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "users": [
    {
      "id": "user1",
      "username": "john_doe"
    },
    {
      "id": "user2",
      "username": "jane_smith"
    }
  ]
}
```

Retrieve a specific user by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "user": {
    "id": "user1",
    "username": "john_doe"
  }
}
```

Delete a specific user by ID
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "message": "User deleted successfully",
  "userId": "user1"
}
```

## Blog Posts
Retrieve all blog posts
- **URL**: `/api/posts`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "posts": [
    {
      "id": "post1",
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post."
    },
    {
      "id": "post2",
      "title": "The Journey Begins",
      "content": "Welcome to my blog!"
    }
  ]
}
```

Retrieve a specific blog post by ID
- **URL**: `/api/posts/:id`
- **Method**: `GET`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "post": {
    "id": "post1",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post."
  }
}
```

Create a new blog post
- **URL**: `/api/posts`
- **Method**: `POST`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Request body**:
```json
{
  "title": "New Blog Post",
  "content": "This is the content of my new blog post."
}
```
- **Response**:
```json
{
  "message": "Blog post created successfully",
  "postId": "post3"
}
```

Update an existing blog post by ID
- **URL**: `/api/posts/:id`
- **Method**: `PUT`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Request body**:
```json
{
  "title": "Updated Blog Post",
  "content": "This is the updated content of my blog post."
}
```
- **Response**:
```json
{
  "message": "Blog post updated successfully",
  "postId": "post1"
}
```
Delete a specific blog post by ID
- **URL**: `/api/posts/:id`
- **Method**: `DELETE`
- **Headers**:
  - **Authorization**: `Bearer <access-token>`
- **Response**:
```json
{
  "message": "Blog post deleted successfully",
  "postId": "post1"
}
```

That's it! You're now ready to use and test the Blog API. Refer to the endpoints section for detailed information on each API route.

Happy coding!

Feel free to customize and enhance the documentation further to fit your specific API implementation and requirements.
