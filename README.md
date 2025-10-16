### 1. Backend Setup

```bash
cd server
bun install
cp .env.example .env
bun run dev
```

Server runs at: **http://localhost:3000**

### 2. Frontend Setup

```bash
cd client
bun install
bun run dev
```

App runs at: **http://localhost:5173**

## 🔑 Login Credentials

```
Email: drian@example.com
Password: 12345678
```

## 📦 Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS v4, Axios, React Router  
**Backend:** Express, TypeScript, JWT, bcryptjs  
**Storage:** In-memory (arrays)

## 🎯 Features

- ✅ Login with JWT authentication
- ✅ Create, edit, delete todos
- ✅ Filter: All, Completed, Pending
- ✅ Statistics dashboard
- ✅ Responsive Material Design UI

## 📡 API Endpoints

```
POST /auth/login                    # Login
GET  /todos                         # Get all todos
POST /todos                         # Create todo
PUT  /todos/:id                     # Update todo
DELETE /todos/:id                   # Delete todo
```

## 📁 Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Login & TodoList pages
│   │   ├── api/           # Axios config
│   │   └── App.tsx        # Main app
│   └── package.json
│
└── server/                # Express backend
    ├── src/
    │   ├── domain/        # Routes (auth, todo)
    │   ├── middleware/    # JWT auth
    │   └── utils/         # Data storage
    └── package.json
```

## ⚙️ Environment Variables

cp .env.example .env
