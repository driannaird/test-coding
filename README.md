# 📝 Todo App - Full Stack Application

A modern, full-stack Todo application built with React, TypeScript, Express, and Tailwind CSS. Features a clean Material Design black and white theme with in-memory data storage.

## ✨ Features

### Frontend (React + TypeScript)

- 🔐 **Login System** with JWT authentication
- ✅ **Todo Management** - Create, Read, Update, Delete
- 🎯 **Filter Functionality** - View all, completed, or pending todos
- 📊 **Statistics Dashboard** - Track total, completed, and pending tasks
- 🎨 **Modern UI** - Material Design with Tailwind CSS
- 📱 **Responsive Design** - Works on mobile and desktop
- ⚡ **Real-time Updates** - Instant feedback on all actions

### Backend (Express + TypeScript)

- 🔒 **JWT Authentication** - Secure token-based auth
- 📦 **In-Memory Storage** - No database required (arrays)
- 🛡️ **Protected Routes** - Middleware authentication
- 🚀 **RESTful API** - Clean API endpoints
- ⚙️ **TypeScript** - Type-safe backend

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Router** - Routing

### Backend

- **Express 5** - Web Framework
- **TypeScript** - Type Safety
- **JSON Web Token** - Authentication
- **bcryptjs** - Password Hashing
- **Bun** - Runtime

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher) OR [Bun](https://bun.sh/)
- npm, yarn, or bun package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-test
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
bun install
# or
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# The default values should work for local development
```

**Environment Variables (.env):**

```env
APP_PORT=3000
USER=drian
PASSWORD=12345678
JWT_SECRET="ALSKDJFALSDKJFKALS934skljdfksjdflkjsdfdsf"
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd ../client

# Install dependencies
bun install
# or
npm install
```

## 🎮 Running the Application

### Start Backend Server

```bash
# In the /server directory
bun run dev
# or
npm run dev
```

The backend server will start at **http://localhost:3000**

### Start Frontend Application

```bash
# In the /client directory (open new terminal)
bun run dev
# or
npm run dev
```

The frontend application will start at **http://localhost:5173** (or next available port)

## 🔑 Default Login Credentials

```
Email: drian@example.com
Password: 12345678
```

## 📡 API Endpoints

### Authentication

- `POST /auth/login` - User login

**Request Body:**

```json
{
  "email": "drian@example.com",
  "password": "12345678"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "name": "drian",
      "email": "drian@example.com"
    }
  }
}
```

### Todos (Protected Routes - Requires JWT Token)

#### Get All Todos

- `GET /todos`
- Headers: `Authorization: Bearer <token>`

#### Create Todo

- `POST /todos`
- Headers: `Authorization: Bearer <token>`
- Body:

```json
{
  "text": "Your todo text here"
}
```

#### Update Todo

- `PUT /todos/:id`
- Headers: `Authorization: Bearer <token>`
- Body:

```json
{
  "text": "Updated todo text",
  "completed": true
}
```

#### Delete Todo

- `DELETE /todos/:id`
- Headers: `Authorization: Bearer <token>`

## 📁 Project Structure

```
todo-test/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts   # Axios configuration with interceptors
│   │   ├── pages/
│   │   │   ├── Login.tsx  # Login page
│   │   │   └── TodoList.tsx # Todo list page
│   │   ├── App.tsx        # Main app with routing
│   │   ├── App.css        # Global styles
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.ts     # Vite configuration
│
└── server/                # Backend application
    ├── src/
    │   ├── domain/
    │   │   ├── auth/
    │   │   │   └── index.ts    # Authentication routes
    │   │   └── todo/
    │   │       └── index.ts    # Todo routes
    │   ├── middleware/
    │   │   └── auth.ts         # JWT authentication middleware
    │   ├── utils/
    │   │   └── datas.ts        # In-memory data storage
    │   └── index.ts            # Server entry point
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

## 🎨 Features Overview

### Login Page

- Modern Material Design interface
- Form validation
- Error handling with visual feedback
- Loading states with animations
- Default credentials display

### Todo List Page

- **Statistics Dashboard** - Real-time count of total, completed, and pending tasks
- **Add Todo** - Quick add form with validation
- **Filter System** - View all, completed, or pending todos
- **Inline Editing** - Edit todos directly in the list
- **Checkbox Toggle** - Quick complete/uncomplete
- **Delete with Confirmation** - Prevent accidental deletions
- **Timestamp Display** - See when todos were created
- **Empty States** - Helpful messages when no todos exist
- **Loading States** - Smooth loading animations

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Automatic token management via Axios interceptors
- Auto logout on 401 responses

## 💾 Data Storage

This application uses **in-memory storage** (arrays) for simplicity:

- ✅ No database setup required
- ✅ Perfect for development and testing
- ⚠️ Data resets when server restarts
- 📝 Easy to extend to use a real database (PostgreSQL, MongoDB, etc.)

## 🎯 Development Commands

### Backend

```bash
cd server
bun run dev        # Start development server
bun run build      # Build for production (if configured)
```

### Frontend

```bash
cd client
bun run dev        # Start development server
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Run ESLint
```

## 📝 Notes

- The backend runs on port `3000` by default (configurable in `.env`)
- The frontend runs on port `5173` by default (Vite default)
- All todos are stored in memory and will be lost when the server restarts
- JWT token is stored in localStorage
- The default user is created automatically on server start

## 🚧 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User registration
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Priority levels
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Drag and drop reordering
- [ ] Data persistence

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using React, Express, and Tailwind CSS

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Todo-ing! 📝✨**
