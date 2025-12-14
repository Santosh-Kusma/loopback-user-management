# 🚀 User Management Backend

**Built with LoopBack 4, MongoDB & JWT Authentication**

## Overview

This backend application provides secure and scalable APIs for user management.
It supports user registration, authentication, profile management, password updates, and logout using JWT-based authentication.
---

## ✨ Features

- User registration with validation
- Duplicate email prevention
- JWT-based authentication
- Secure login for registered users only
- Protected APIs
- View user profile
- Update profile details (email & password restricted)
- Change password securely
- Logout handling
- MongoDB integration

---

## 🛠 Tech Stack

- Node.js
- LoopBack 4
- MongoDB
- JWT (JSON Web Token)
- bcrypt (password hashing)

---

## ⚙️ Setup & Run

# Install dependencies
npm install

# env
Create a `.env` file in the `backend` root folder and configure the following:
JWT_SECRET 
JWT_EXPIRES_IN=1h
DB_URL

# Start the server
npm start

# Server will run on
http://localhost:3000

# OpenAPI Doc
http://localhost:3000/explorer

---

## Authentication Flow

Login returns a JWT token

Token must be sent in Authorization header as:
 - Bearer <token>

Protected routes require valid JWT

---

📂 Important APIs

- POST /user/register – Register new user
- POST /user/login – User login
- GET /user/account – View profile
- PATCH /user/update-details – Update profile
- PATCH /user/change-password – Change password
- POST /user/logout – Logout

---

✅ Notes

- Duplicate email registrations are not allowed
- Only registered users can log in
- Passwords are never returned in responses

---

👨‍💻 Author
Santosh Kusma




