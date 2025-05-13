# API Documentation

## **1. User Registration**

**Endpoint**: `/api/auth/register`
**Method**: `POST`

### Description:

This endpoint allows a user to register by providing an email, phone, and password. A new user is created in the system.

### Request Payload:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Response:

- **Status Code**: 201 - User registered successfully
- **Response Body**:

```json
{
  "message": "User registered successfully."
}
```

### Error Responses:

- **Status Code**: 409 - Phone number already registered

```json
{
  "error": "Number already registered."
}
```

- **Status Code**: 500 - Registration failed

```json
{
  "error": "Registration failed."
}
```

---

## **2. User Login**

**Endpoint**: `/api/auth/login`
**Method**: `POST`

### Description:

This endpoint allows a user to log in using their phone number and password.

### Request Payload:

```json
{
  "phone": "+1234567890",
  "password": "password123"
}
```

### Response:

- **Status Code**: 200 - Login successful
- **Response Body**:

```json
{
  "message": "Login successful.",
  "token": "JWT_TOKEN_HERE"
}
```

### Error Responses:

- **Status Code**: 401 - Invalid credentials

```json
{
  "error": "Invalid credentials."
}
```

- **Status Code**: 500 - Login failed

```json
{
  "error": "Login failed."
}
```

---

## **3. Create Post**

**Endpoint**: `/api/posts`
**Method**: `POST`

### Description:

This endpoint allows a logged-in user to create a new post.

### Request Headers:

- **Authorization**: Bearer `JWT_TOKEN_HERE`

### Request Payload:

```json
{
  "content": "This is my first post.",
  "author": "user_id_here"
}
```

### Response:

- **Status Code**: 201 - Post created successfully
- **Response Body**:

```json
{
  "_id": "post_id_here",
  "content": "This is my first post.",
  "author": "user_id_here",
  "likes": [],
  "comments": [],
  "shares": 0,
  "createdAt": "2025-05-13T00:00:00Z",
  "updatedAt": "2025-05-13T00:00:00Z"
}
```

### Error Responses:

- **Status Code**: 500 - Post creation failed

```json
{
  "error": "Post creation failed."
}
```

---

## **4. Like a Post**

**Endpoint**: `/api/posts/:id/like`
**Method**: `POST`

### Description:

This endpoint allows a logged-in user to like a post.

### Request Headers:

- **Authorization**: Bearer `JWT_TOKEN_HERE`

### Request Params:

- `id`: The ID of the post to like.

### Response:

- **Status Code**: 200 - Post liked successfully
- **Response Body**:

```json
{
  "_id": "post_id_here",
  "content": "This is my first post.",
  "author": "user_id_here",
  "likes": ["user_id_here"],
  "comments": [],
  "shares": 0,
  "createdAt": "2025-05-13T00:00:00Z",
  "updatedAt": "2025-05-13T00:00:00Z"
}
```

### Error Responses:

- **Status Code**: 404 - Post not found

```json
{
  "message": "Post not found"
}
```

- **Status Code**: 400 - Already liked

```json
{
  "message": "You already liked this post"
}
```

- **Status Code**: 500 - Like failed

```json
{
  "error": "Failed to like post."
}
```

---

## **5. Unlike a Post**

**Endpoint**: `/api/posts/:id/unlike`
**Method**: `POST`

### Description:

This endpoint allows a logged-in user to unlike a post.

### Request Headers:

- **Authorization**: Bearer `JWT_TOKEN_HERE`

### Request Params:

- `id`: The ID of the post to unlike.

### Response:

- **Status Code**: 200 - Post unliked successfully
- **Response Body**:

```json
{
  "_id": "post_id_here",
  "content": "This is my first post.",
  "author": "user_id_here",
  "likes": [],
  "comments": [],
  "shares": 0,
  "createdAt": "2025-05-13T00:00:00Z",
  "updatedAt": "2025-05-13T00:00:00Z"
}
```

### Error Responses:

- **Status Code**: 404 - Post not found

```json
{
  "message": "Post not found"
}
```

- **Status Code**: 400 - Not liked yet

```json
{
  "message": "You haven't liked this post yet"
}
```

- **Status Code**: 500 - Unlike failed

```json
{
  "error": "Failed to unlike post."
}
```

---

## **6. Comment on a Post**

**Endpoint**: `/api/posts/:id/comment`
**Method**: `POST`

### Description:

This endpoint allows a logged-in user to comment on a post.

### Request Headers:

- **Authorization**: Bearer `JWT_TOKEN_HERE`

### Request Params:

- `id`: The ID of the post to comment on.

### Request Payload:

```json
{
  "text": "Great post! Thanks for sharing."
}
```

### Response:

- **Status Code**: 200 - Comment added successfully
- **Response Body**:

```json
{
  "_id": "post_id_here",
  "content": "This is my first post.",
  "author": "user_id_here",
  "likes": ["user_id_here"],
  "comments": [
    {
      "user": "user_id_here",
      "text": "Great post! Thanks for sharing."
    }
  ],
  "shares": 0,
  "createdAt": "2025-05-13T00:00:00Z",
  "updatedAt": "2025-05-13T00:00:00Z"
}
```

### Error Responses:

- **Status Code**: 404 - Post not found

```json
{
  "message": "Post not found"
}
```

- **Status Code**: 500 - Comment failed

```json
{
  "error": "Failed to comment on post."
}
```

---

## **7. Share a Post**

**Endpoint**: `/api/posts/:id/share`
**Method**: `POST`

### Description:

This endpoint allows a logged-in user to share a post.

### Request Headers:

- **Authorization**: Bearer `JWT_TOKEN_HERE`

### Request Params:

- `id`: The ID of the post to share.

### Response:

- **Status Code**: 200 - Post shared successfully
- **Response Body**:

```json
{
  "_id": "post_id_here",
  "content": "This is my first post.",
  "author": "user_id_here",
  "likes": ["user_id_here"],
  "comments": [],
  "shares": 1,
  "createdAt": "2025-05-13T00:00:00Z",
  "updatedAt": "2025-05-13T00:00:00Z"
}
```

### Error Responses:

- **Status Code**: 404 - Post not found

```json
{
  "message": "Post not found"
}
```

- **Status Code**: 500 - Share failed

```json
{
  "error": "Failed to share post."
}
```

---

### Authentication (JWT):

For protected routes (like post creation, liking, commenting, etc.), the request must include the `Authorization` header with a **Bearer** token. The token is obtained after logging in and should be passed as follows:

```plaintext
Authorization: Bearer JWT_TOKEN_HERE
```

---

This concludes the API documentation for the user registration, login, and post interaction features. You can customize the error messages and response structures based on your application's requirements.
