# 📝 Taskly

*Taskly* is a modern and intuitive task management application that helps users stay organized and productive. Designed with simplicity and usability in mind, it allows you to manage your tasks with precision by defining specific due dates and times, assigning custom tags, setting priorities, and categorizing task types — all visually differentiated by color-coded labels.

> This repository contains both the **Backend** and the **Frontend** of the project (monorepo structure).

---

## 🌐 Frontend

The frontend of Taskly was developed with simplicity, clarity, and user experience as the highest priorities. It offers a responsive and lightweight interface that allows users to focus entirely on what matters: their tasks.

Built with **React**, it uses **React Router** for navigation, **React Query** for efficient data fetching and caching, and **TailwindCSS** for a fast, consistent, and utility-first styling approach.

### 🧩 Structure

The frontend is organized into clear and intuitive directories:

- `pages/`: Main pages such as the Dashboard.
- `components/`: Reusable UI components like Navbar, Aside, Auth, and TaskForm.
- `hooks/`: Custom hooks such as `useValidateCredentials`, responsible for session validation.
- `helpers/`: Utility functions that simplify and centralize common logic.
- `api/`: Axios configuration and API request modules.
- `types/`: TypeScript interfaces used across the application (e.g., `Task`).

### 🔐 Authentication & Session

- Uses **JWT tokens stored in HTTP-only cookies** to keep users authenticated.
- A modal-based login/register system is triggered automatically when the user session is invalid or missing.
- Protected routes and UI interactions rely on a credential validation hook (`useValidateCredentials`).

### 🗂 Task Interaction

- Users can create, edit, delete, and update the status of their tasks directly through the interface.
- Task creation and editing are handled through a reusable modal component (`TaskForm`), which opens either from the Dashboard or when a task is selected for editing.
- Tasks include metadata like priority, type, date/time, and custom tags — with visual cues to help distinguish them quickly.

### ⚙️ UI & Routing

- Centralized routing using `react-router-dom`, with a Dashboard as the main route.
- The layout includes a responsive Navbar and Aside for navigation.
- Modals are managed through local state, offering a smooth and minimalistic overlay experience.

---

🚧 *In development...*

The frontend is being built with user experience as the top priority. It will feature a clean, responsive, and accessible interface for interacting with your tasks easily and efficiently.

**Planned Features:**

- Calendar-based task view
- Color indicators for priorities and task types
- Quick filters by tag, type, or date
- Smooth UX and mobile-first responsive design

---

## 🛠 Backend

The backend is a secure and scalable RESTful API built with **TypeScript** and **Express**, structured using **Object-Oriented Programming (OOP)** and layered architecture (Controllers → Services → Repositories).

### 🔐 Authentication & Security

- **JWT (JSON Web Token)** for secure user authentication
- **HTTP-only Cookies** for safe token storage
- **Bcrypt** for password hashing
- **Auth Middleware** to protect private routes

### 🧪 Validation & Error Handling

- **Zod** schema validation for requests
- **Global error handler middleware** for graceful error management

### 🧱 Architecture Overview

- **Controllers** handle HTTP requests and responses
- **Services** contain business logic
- **Repositories** manage database operations (MongoDB via Prisma ORM)

---

## 📦 Technologies Used

- **TypeScript**
- **Express.js**
- **MongoDB** (via **Prisma Client**)
- **JWT**
- **Bcrypt**
- **Zod**
- **Cookie-Parser**
- **Node.js**
- **POO (OOP-based design)**

---

## 📌 API Features

### 🔑 Authentication Routes

| Method | Route      | Auth Required | Description                          |
|--------|------------|----------------|--------------------------------------|
| POST   | /register  | ❌             | Register a new user                  |
| POST   | /login     | ❌             | Authenticate a user and return token |
| POST   | /logout    | ✅             | Logout and clear the auth cookie     |
| GET    | /getSelf   | ✅             | Get the currently authenticated user |

### ✅ Task Routes

| Method | Route               | Auth Required | Description                              |
|--------|---------------------|----------------|------------------------------------------|
| POST   | /tasks              | ✅             | Create a new task                        |
| GET    | /tasks              | ✅             | Get all tasks for the authenticated user |
| PUT    | /tasks/:id          | ✅             | Update task details                      |
| PATCH  | /tasks/status/:id   | ✅             | Update the status of a task              |
| DELETE | /tasks/:id          | ✅             | Delete a task                            |

> All task routes are protected and require user authentication.

---

## ⚙️ Getting Started

### 🧾 Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance or Atlas cluster
- npm / yarn

---

### 📂 Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/taskflow.git
   cd taskflow
