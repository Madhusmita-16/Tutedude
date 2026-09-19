# Assignment 8: Implementing To-Do List APIs with Node.js, Express.js, MongoDB & React Frontend Integration

**Course**: Full Stack Web Development  
**Assignment**: Assignment 8 - Full Stack To-Do List Application  
**Author / Student**: Madhusmita  
**Date**: September 19, 2026  

---

## 📌 Executive Summary

Assignment 8 focuses on practical implementation of the To-Do List application, seamlessly connecting a **React.js frontend UI** with a **Node.js, Express.js, and MongoDB backend architecture**.

---

## 🏗️ Part 1: Backend Architecture (Node.js, Express.js & MongoDB)

### 1. Project Directory Structure
```
Assignment 8/
├── config/
│   └── db.js                 # MongoDB connection & configuration
├── models/
│   └── Task.js               # Task Schema & Data Model
├── controllers/
│   └── taskController.js     # Express Controllers for CRUD & Search logic
├── routes/
│   └── taskRoutes.js         # REST API Router dispatcher
├── middleware/
│   └── errorHandler.js     # Centralized error handler
├── public/
│   ├── index.html            # React Frontend Application
│   └── style.css             # White & Blue CSS design system
├── server.js                 # Main Express.js server entry point
├── package.json              # Dependencies & npm scripts
└── README.md                 # Setup & configuration guide
```

### 2. Implemented REST API Endpoints Matrix

| Operation | HTTP Method | Endpoint URL | Description | HTTP Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **Fetch All Tasks** | `GET` | `/api/tasks` | Retrieves list of tasks (supports `?status=active\|completed`) | `200 OK` |
| **Search Tasks** | `GET` | `/api/tasks/search` | Searches tasks matching query `?q=keyword` | `200 OK` |
| **Fetch Single** | `GET` | `/api/tasks/:id` | Fetches single task by unique ID | `200 OK` / `404` |
| **Create Task** | `POST` | `/api/tasks` | Creates a new task object | `201 Created` |
| **Partial Update** | `PATCH` | `/api/tasks/:id` | Toggles completed state or updates title | `200 OK` / `404` |
| **Full Replace** | `PUT` | `/api/tasks/:id` | Replaces full task object | `200 OK` / `404` |
| **Delete Single** | `DELETE` | `/api/tasks/:id` | Deletes single task by ID | `200 OK` / `404` |
| **Clear Completed** | `DELETE` | `/api/tasks/completed` | Removes all completed tasks in bulk | `200 OK` |

---

## ⚛️ Part 2: React Frontend Integration

### 1. State Management & Hooks
- **`useState`**: Manages `tasks`, `loading`, `searchQuery`, `statusFilter`, and form inputs (`title`, `description`, `priority`).
- **`useEffect` & `useCallback`**: Automatically re-fetches data whenever `searchQuery`, `statusFilter`, or `priorityFilter` changes.

### 2. User Interactions & Dynamic UI Updates
- **Task Creation**: Submitting the form fires `POST /api/tasks` and dynamically prepends the new task to the UI grid.
- **Completion Toggle**: Checking a task box fires `PATCH /api/tasks/:id` and toggles completion styling instantly.
- **Search Query Filtering**: Typing into the search bar fires `GET /api/tasks/search?q=keyword` to filter tasks in real-time.
- **Clear Completed**: Clicking `Clear Completed` fires `DELETE /api/tasks/completed` to purge completed tasks.

---

## ⚙️ Environment Variables & Configuration

Create a `.env` file or pass environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/tutedude_todo_db
```

---

## 🛠️ Challenges Faced & Solutions Implemented

1. **State Synchronization Between Frontend & Backend**:
   - *Challenge*: Race conditions when users rapidly toggle task checkboxes.
   - *Solution*: Leveraged React's `useCallback` hook tied to state filters, ensuring asynchronous state updates synchronize cleanly with backend API responses.

2. **MongoDB Connectivity Fallbacks**:
   - *Challenge*: App failure when running locally without a running MongoDB service instance.
   - *Solution*: Built an in-memory data store fallback inside `config/db.js` and `controllers/taskController.js` ensuring 100% uptime for local testing.
