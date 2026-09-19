# Assignment 8: Implementing To-Do List APIs with Express.js, MongoDB (Mongoose ODM), and React Frontend
**Tutedude Full-Stack Web Development Course**  
**Student Name:** Madhusmita  
**Date:** September 19, 2026  
**Status:** Completed & Fully Refactored  
**Repository:** [Madhusmita-16/Tutedude](https://github.com/Madhusmita-16/Tutedude)

---

## 📌 Executive Summary
This document outlines the refactored, production-ready implementation for **Assignment 8: Implementing To-Do List APIs**. The application strictly adheres to modern MERN backend standards:

1. **Express.js Framework**: Installed and configured for HTTP request routing, middleware (`cors`, `express.json()`, `express.urlencoded()`), and static asset serving.
2. **Active MongoDB & Mongoose ODM**: Fully integrated Mongoose ODM schema model (`Task.js`) connected to active MongoDB database instance (`tutedude_todo_db`).
3. **No In-Memory / Array Fallbacks**: Removed mock memory fallbacks. Database operations directly query MongoDB via Mongoose ODM.
4. **Clean Controller-Service-Routes Architecture**:
   - `routes/taskRoutes.js` (Express Router mapping endpoints)
   - `controllers/taskController.js` (HTTP Request & Response handlers)
   - `services/taskService.js` (Decoupled business logic & Mongoose database queries)
   - `models/Task.js` (Mongoose Model Schema)
   - `config/db.js` (Mongoose MongoDB Connection Manager)
5. **Axios Client Integration**: React frontend uses `axios` (`axios.get`, `axios.post`, `axios.put`, `axios.patch`, `axios.delete`) for all API transactions.
6. **React UI Edit Modal**: Added interactive Edit Task modal allowing real-time modification of task details (Title, Description, Priority, Category, Due Date).
7. **UI Error & Success Banners**: Replaced `window.alert()` calls with smooth inline notification banners (`.ui-banner.error` & `.ui-banner.success`).

---

## 🛠️ Architecture & Directory Structure

```
Assignment 8/
├── config/
│   └── db.js                 # Mongoose connection setup (mongodb://localhost:27017/tutedude_todo_db)
├── models/
│   └── Task.js               # Mongoose Schema & Data Model
├── services/
│   └── taskService.js        # Business Logic & Mongoose Database Service Layer
├── controllers/
│   └── taskController.js     # Express Controller handling HTTP Requests/Responses
├── routes/
│   └── taskRoutes.js         # Express Router endpoints (/api/tasks)
├── public/
│   ├── index.html            # React Frontend SPA with Axios & Edit Modal
│   └── style.css             # White & Blue responsive design system
├── server.js                 # Express Application Entry Point
├── package.json              # Express, Mongoose, Axios, Cors, Dotenv dependencies
└── README.md                 # Setup & Run Guide
```

---

## 🔌 REST API Reference

| HTTP Method | Endpoint | Handler | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | `taskController.getTasks` | Retrieves tasks with optional search, category, and status filters. |
| **POST** | `/api/tasks` | `taskController.createTask` | Creates a new task record in MongoDB via Mongoose. |
| **GET** | `/api/tasks/:id` | `taskController.getTaskById` | Fetches a single task by MongoDB ObjectId. |
| **PUT** | `/api/tasks/:id` | `taskController.updateTask` | Updates task title, description, priority, category, or due date. |
| **PATCH** | `/api/tasks/:id/toggle` | `taskController.toggleTaskStatus` | Toggles completed boolean status. |
| **DELETE** | `/api/tasks/:id` | `taskController.deleteTask` | Removes a task from MongoDB. |

---

## ⚡ Setup & Execution Instructions

### 1. Install Dependencies
```bash
cd "f:\works\Tutedude\Assignment 8"
npm install
```

### 2. Start Express & MongoDB Server
```bash
npm start
```

### 3. Access Application
Open `http://localhost:3000/` in your browser.

---

## 📄 Compliance Checklist
- [x] Express.js framework used for server and routing.
- [x] Mongoose ODM used for active MongoDB persistence.
- [x] Absence of hardcoded/in-memory fallbacks.
- [x] Service layer (`services/taskService.js`) implemented.
- [x] Axios used for client-side API requests.
- [x] Edit task modal added to React UI.
- [x] UI error banners replaced window alerts.
