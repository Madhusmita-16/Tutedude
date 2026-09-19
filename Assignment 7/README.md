# Assignment 7: Identifying and Planning RESTful APIs for To-Do List App

## 📌 Overview
This repository contains the complete RESTful API specifications, architectural plan, and live reference web server implementation for a **To-Do List Application**.

---

## 🗺️ RESTful API Endpoints Matrix

| HTTP Method | Endpoint URL | Description | Response Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task item | `201 Created` |
| `GET` | `/api/tasks` | Retrieve all tasks (supports `?status=active\|completed`) | `200 OK` |
| `GET` | `/api/tasks/:id` | Retrieve single task details by ID | `200 OK` / `404` |
| `PATCH` | `/api/tasks/:id` | Partially update task (e.g. toggle completion) | `200 OK` / `404` |
| `PUT` | `/api/tasks/:id` | Replace task object | `200 OK` / `404` |
| `DELETE` | `/api/tasks/:id` | Delete task by ID | `200 OK` / `404` |
| `DELETE` | `/api/tasks/completed` | Clear all completed tasks | `200 OK` |

---

## 🚀 How to Run the REST API Server

Run the server with Node.js:

```bash
node server.js
```

Then open your browser at **[http://localhost:3000](http://localhost:3000)** to interact with the live REST API Explorer dashboard!
