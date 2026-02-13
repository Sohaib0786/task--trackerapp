🚀 Scalable Web App with Authentication & Dashboard

A full-stack web application built with React + Node.js + MongoDB, implementing secure authentication, protected routes, and a scalable dashboard with CRUD functionality.

This project was built as part of a Frontend Developer Internship Assignment to demonstrate frontend engineering skills, backend integration, security best practices, and scalable architecture.

📌 Tech Stack
🖥 Frontend

React.js (Vite)

Tailwind CSS

React Router

Axios

Context API (Auth State Management)

⚙ Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Bcrypt (Password Hashing)


✨ Features
🔐 Authentication (JWT-Based)

User Registration

User Login

Secure Password Hashing (bcrypt)

JWT Token Generation

Protected Routes (Dashboard requires login)

Logout functionality

👤 User Profile

Fetch logged-in user data

Update profile information

Update password securely

📊 Dashboard

Display user profile

CRUD operations on tasks

Search tasks

Filter by status & priority

Sorting support

Responsive UI

🔒 Security Practices

Password hashing with bcrypt

JWT-based authentication middleware

Protected API routes

Centralized error handling

Rate limiting

Helmet security middleware

Input validation (express-validator)


🛠 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Backend Setup
cd server
npm install


Create .env file inside server/:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d

Start backend:

npm run dev


Backend runs on:

http://localhost:8000


3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173


🔗 API Endpoints
🔐 Auth Routes

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | /api/auth/register | Register user      |
| POST   | /api/auth/login    | Login user         |
| GET    | /api/auth/me       | Get logged-in user |
| PUT    | /api/auth/profile  | Update profile     |
| PUT    | /api/auth/password | Update password    |

📌 Task Routes

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/tasks       | Get all tasks       |
| GET    | /api/tasks/:id   | Get single task     |
| POST   | /api/tasks       | Create task         |
| PUT    | /api/tasks/:id   | Update task         |
| DELETE | /api/tasks/:id   | Delete task         |
| GET    | /api/tasks/stats | Get task statistics |
