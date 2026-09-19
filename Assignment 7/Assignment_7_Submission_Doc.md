# Assignment 7: Identifying APIs for To-Do List App

**Course**: Full Stack Web Development  
**Assignment**: Assignment 7 - Identifying & Planning RESTful APIs for To-Do List App  
**Author / Student**: Madhusmita  
**Date**: September 19, 2026  

---

## 📌 Executive Summary & Objective

The objective of this assignment is to identify, design, and plan the necessary **RESTful API endpoints** required to back a To-Do List web application (built with React.js frontend). 

By structuring the backend around resource-oriented architecture, we establish a clean separation of concerns between client UI rendering and server data persistence.

---

## 🗺️ RESTful API Endpoint Summary Matrix

| Operation | HTTP Method | Endpoint URL | Description | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/api/tasks` | Creates a new task | `201 Created` | `400 Bad Request` |
| **Read (All)** | `GET` | `/api/tasks` | Retrieves list of all tasks (supports query filtering) | `200 OK` | `500 Server Error` |
| **Read (Single)** | `GET` | `/api/tasks/:id` | Retrieves details for a single task by ID | `200 OK` | `404 Not Found` |
| **Update (Full)** | `PUT` | `/api/tasks/:id` | Replaces an existing task's entire data object | `200 OK` | `400 / 404` |
| **Update (Partial)** | `PATCH` | `/api/tasks/:id` | Partially updates specific fields (e.g., toggle completed) | `200 OK` | `400 / 404` |
| **Delete (Single)** | `DELETE` | `/api/tasks/:id` | Removes a specific task by ID | `200 OK` / `204` | `404 Not Found` |
| **Delete (Bulk)** | `DELETE` | `/api/tasks/completed` | Removes all completed tasks in a single operation | `200 OK` | `500 Server Error` |

---

## 🔍 Detailed API Endpoint Specifications

### 1. Add / Create Task
- **Endpoint**: `POST /api/tasks`
- **Purpose**: Creates a new task item in the system.
- **Reasoning**: According to REST principles, `POST` to a collection resource (`/api/tasks`) is the standard method for resource creation.

#### Request Headers:
```http
Content-Type: application/json
```

#### Request Body Schema:
```json
{
  "title": "Buy groceries for dinner",
  "description": "Get milk, eggs, bread, and fresh vegetables from store.",
  "priority": "high",
  "dueDate": "2026-09-25T18:00:00.000Z"
}
```

#### Server-Side Unique Identifier Generation Logic:
Each task requires a globally unique identifier (`id`). The server generates IDs using **UUID v4 (Universally Unique Identifier)**, such as `"task-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"`.
- **Reasoning**: UUIDs avoid primary key collisions, prevent sequential ID guessing security vulnerabilities, and work seamlessly in distributed systems.

#### Expected Response (`201 Created`):
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "task-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "title": "Buy groceries for dinner",
    "description": "Get milk, eggs, bread, and fresh vegetables from store.",
    "priority": "high",
    "completed": false,
    "dueDate": "2026-09-25T18:00:00.000Z",
    "createdAt": "2026-09-19T17:45:00.000Z",
    "updatedAt": "2026-09-19T17:45:00.000Z"
  }
}
```

---

### 2. Fetch All Tasks
- **Endpoint**: `GET /api/tasks`
- **Purpose**: Retrieves all task items for rendering in the React task list dashboard.
- **Query Parameters**:
  - `status`: `all` | `completed` | `active` (e.g. `GET /api/tasks?status=active`)
  - `priority`: `low` | `medium` | `high`

#### Expected Response (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "task-101",
      "title": "Complete Node.js Assignment 7",
      "description": "Outline REST API endpoints and document specifications.",
      "priority": "high",
      "completed": true,
      "dueDate": "2026-09-20T23:59:59.000Z",
      "createdAt": "2026-09-19T10:00:00.000Z"
    },
    {
      "id": "task-102",
      "title": "Submit assignment video demo",
      "description": "Record screen showing API Explorer working.",
      "priority": "medium",
      "completed": false,
      "dueDate": "2026-09-21T18:00:00.000Z",
      "createdAt": "2026-09-19T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Fetch Single Task Details
- **Endpoint**: `GET /api/tasks/:id`
- **Purpose**: Retrieves comprehensive details for a specific task by its unique ID.
- **Expected Response (`200 OK`)**: Returns task object matching ID.
- **Error Response (`404 Not Found`)**:
```json
{
  "success": false,
  "error": "Task with ID 'task-999' was not found"
}
```

---

### 4. Update Task (Partial / Toggle Status)
- **Endpoint**: `PATCH /api/tasks/:id`
- **Purpose**: Modifies specific fields of a task without sending the entire object payload (e.g., toggling `completed` state).

#### Request Body Schema (Toggling Completion):
```json
{
  "completed": true
}
```

#### Expected Response (`200 OK`):
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "task-102",
    "title": "Submit assignment video demo",
    "completed": true,
    "updatedAt": "2026-09-19T17:50:00.000Z"
  }
}
```

---

### 5. Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Purpose**: Permanently removes a task from the system.

#### Expected Response (`200 OK`):
```json
{
  "success": true,
  "message": "Task 'task-101' has been deleted successfully",
  "deletedId": "task-101"
}
```

---

### 6. Bulk Delete Completed Tasks
- **Endpoint**: `DELETE /api/tasks/completed`
- **Purpose**: Clears all tasks where `completed == true` in a single operation.

#### Expected Response (`200 OK`):
```json
{
  "success": true,
  "message": "Cleared 3 completed tasks",
  "deletedCount": 3
}
```

---

## 🔄 How These APIs Collectively Fulfil CRUD Operations

The identified APIs form a complete **CRUD (Create, Read, Update, Delete)** lifecycle:

1. **CREATE**: User fills out the task form in React -> Frontend sends `POST /api/tasks` -> Server creates task with unique UUID -> React UI renders the new task card.
2. **READ**: React app mounts (`useEffect`) -> Frontend calls `GET /api/tasks` -> Server returns JSON array -> State is populated.
3. **UPDATE**: User clicks checkbox or edits task -> Frontend calls `PATCH /api/tasks/:id` or `PUT /api/tasks/:id` -> Server updates record -> React UI reflects updated state.
4. **DELETE**: User clicks trash icon -> Frontend calls `DELETE /api/tasks/:id` -> Server removes task from data store -> Task disappears from UI grid.

---

## ⚠️ Potential Implementation Challenges & Mitigations

1. **Client-Server State Synchronization**:
   - *Challenge*: When multiple requests occur rapidly (e.g. toggling multiple task checkboxes), race conditions can cause UI state misalignment.
   - *Mitigation*: Implement optimistic UI updates in React backed by request queuing or debouncing.

2. **Input Validation & Data Sanitization**:
   - *Challenge*: Empty task titles or malicious XSS script injections in task descriptions.
   - *Mitigation*: Enforce server-side schema validation using libraries like Joi/Zod and sanitize input strings.

3. **Error Handling & Offline Support**:
   - *Challenge*: Network disconnection while creating/updating a task.
   - *Mitigation*: Standardize HTTP error codes (`400`, `404`, `500`) and fallback to local browser `localStorage` when offline.
