# TaskFlow: Task Management System - Backend

A Node.js/Express backend API for TaskFlow Task Management application.

## Live Demo

**Backend API**: https://task-management-system-vnp0.onrender.com

## Technologies Used

* Node.js & Express.js
* MongoDB & Mongoose
* JWT (Authentication)
* Bcrypt (Password Encryption)
* CORS & Dotenv

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
```bash
git clone https://github.com/Anjana412/Task-management-system
cd Task-management-system
npm install
npm start
```

### Environment Variables

Create `.env` file:
```
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Folder Structure
```
├── controller/
│   ├── usercontroller.js
│   └── taskcontroller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── user.js
│   └── task.js
├── Routes/
│   ├── userRoutes.js
│   └── taskRoutes.js
├── utils/
│   └── db.js
├── index.js
├── .env
└── package.json
```

## API Endpoints

### Authentication
- `POST /user/register` - Register new user
- `POST /user/login` - Login user

### Tasks
- `GET /tasks/viewalltasks` - Get all user tasks
- `POST /tasks/addtask` - Create new task
- `PUT /tasks/updatetask/:id` - Update task
- `DELETE /tasks/deletetask/:id` - Delete task

## Author

**Anjana T**

Email: anjanat0001@gmail.com

GitHub: https://github.com/Anjana412
