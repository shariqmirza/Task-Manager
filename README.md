# Task Manager App

A full-stack Task Management system with Kanban workflow, authentication, and Task manager project.

Built using **Next.js, NestJS, MongoDB**, and **TailwindCSS**.

---

## Features

### Authentication

* User registration & login
* JWT authentication with secure cookies
* Protected routes & middleware
* Logout functionality

### Projects

* Create projects 
* Edit & delete projects
* Project dashboard view

### Tasks & Kanban Board

* Create, edit & delete tasks
* Drag & drop between columns
* Status workflow:

  * TODO
  * IN PROGRESS
  * DONE
* Empty state & loading states

### UI & UX

* Modern responsive design (TailwindCSS)
* Modal-based forms (no browser alerts)
* Clean professional interface

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React Query
* TailwindCSS (Styling)
* dnd-kit (drag & drop)

### Backend

* NestJS
* MongoDB (Mongoose)
* JWT Authentication
* REST API

---

## Project Structure

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

## Authentication Flow

* New users register an account
* Login stores JWT in secure cookie
* Protected routes require authentication
* Middleware redirects unauthorized users

---

## Usage

1. Register a new account
2. Login to dashboard
3. Create a project
4. Open project board
5. Add tasks & drag between columns

---

## Future Improvements

* Real-time collaboration
* Dark mode
* Notifications
* Role-based access
* Activity history

---

## Author

Built as a full-stack assignment project.
