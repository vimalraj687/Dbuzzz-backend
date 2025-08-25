# Dbuzzz-backend (MERN Stack)

This is the backend for a simple Task Manager (To-Do App) built with **Node.js, Express, and MongoDB**.  
It provides RESTful APIs for user authentication and task management.

---

## 📦 Technologies Used
- **Node.js** - JavaScript runtime  
- **Express.js** - Web framework  
- **MongoDB** - NoSQL database  
- **Mongoose** - MongoDB ODM  
- **JWT** - Authentication  
- **bcryptjs** - Password hashing  
- **dotenv** - Environment variables  
- **cors** - Cross-Origin Resource Sharing  

---

## 🚀 Features
- **User Authentication**:
  - Register & Login
  - JWT-based authentication
- **Task Management (CRUD)**:
  - Create, Read, Update, Delete tasks
  - Each task linked to a specific user
  - Protected routes
- **Security & Code Practices**:
  - Passwords hashed with bcrypt
  - JWT stored securely
  - .env for secrets
- **Bonus**:
  - Error handling with async/await
  - CORS configured for frontend

---

## 📁 Folder Structure

backend/
│
├─ controllers/ # Logic for auth and tasks
├─ middleware/ # Auth middleware
├─ models/ # Mongoose models (User, Task)
├─ routes/ # Express routes
├─ utils/ # Helpers & utilities
├─ server.js # Express server
├─ config.js # Database & environment config
└─ package.json

1. Clone the repo:
```bash
git clone https://github.com/yourusername/task-manager-backend.git
cd task-manager-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
🛠️ Running the Server
Development:
bash
Copy
Edit
npm run dev
Server will start at: http://localhost:5000
 
