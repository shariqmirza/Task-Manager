# 🚀 Task Manager (Full Stack)

A modern full-stack Task Management application built with:

- **Frontend:** Next.js 16 (App Router) + TailwindCSS + React Query  
- **Backend:** NestJS + MongoDB + JWT Authentication  
- **Drag & Drop:** dnd-kit  
- **Deployment:** Vercel (Frontend) + Render (Backend)

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Login with JWT
- Secure logout
- Protected routes
- Session handling with token

### 📁 Projects
- Create project
- Edit project name
- Delete project
- Each project belongs to authenticated user only

### 📋 Tasks (Kanban Board)
- Create task
- Edit task
- Delete task
- Drag & Drop between:
  - TODO
  - IN PROGRESS
  - DONE
- Real-time UI update with React Query

### 🎨 UI
- Clean modern Tailwind design
- Responsive layout
- Loading states
- Empty states
- Modal-based editing (no browser alerts)

---

## 🏗️ Project Structure


```
Task Manager/
|
|--- backend/   -> NestJS API
|--- frontend/  -> Next.js application


---

# Backend Setup

### 1️. Go to backend folder

cd backend

### 2️. Install dependencies

npm install

### 3️. Create environment file

Create `.env` inside backend folder:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


### 4️. Run backend


npm run start:dev


Backend runs at port no:


http://localhost:4000




# Frontend Setup

### 1️. Go to frontend folder


cd frontend


### 2️. Install dependencies

npm install

### 3️. Run frontend

npm run dev

Frontend runs at port:

http://localhost:3000

---


---

# 🔒 Security Notes

- JWT authentication
- Protected API routes using NestJS Guards
- User-specific data isolation
- Token cleared on logout
- Route-level protection on frontend

---

# 🧠 Technical Decisions

- Used React Query for API state management
- Used dnd-kit for drag-and-drop (lightweight & modern)
- Used modal components instead of browser alerts
- Clean separation of concerns (Modules in NestJS)
- Production-ready folder structure

---

# 🚀 Future Improvements

- Role-based access
- Activity logs
- Task due dates
- Filtering & search
- Optimistic UI updates
- Unit & integration tests

---

# 👨‍💻 Author

Built as a full-stack assignment project demonstrating:

- API architecture
- Authentication flow
- State management
- Modern UI design
- Production deployment
