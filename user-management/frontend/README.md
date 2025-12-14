🎨 User Management Frontend
**Built with React, Axios & Modern UI/UX**

📌 Overview

This frontend application provides a modern and user-friendly interface for the User Management System.
It integrates seamlessly with the LoopBack backend and handles authentication using JWT.

---

✨ Features

- User Registration
- User Login
- Profile Dashboard
- Update Profile
- Change Password
- Secure Logout
- Protected Routes
- Loading & Error Handling
- Modern UI/UX Design

---

🛠 Tech Stack

- React (Vite)
- React Router
- Axios
- Custom CSS
- JWT-based authentication

---

⚙️ Setup Instructions
# Install dependencies
npm install

# Start the application
npm run dev

# Application will run on:
http://localhost:5173

---

🔐 Authentication Handling

- JWT token stored in localStorage
- Axios interceptor automatically attaches token
- Protected routes redirect unauthenticated users to login

---

📂 Pages

/ – Login

/register – Register

/profile – Profile Dashboard

/update-profile – Update Profile

/change-password – Change Password

---

✅ Notes

- Email cannot be updated from profile
- Password can only be changed via Change Password page
- Logout redirects user to login page

---

👨‍💻 Author
Santosh Kusma



