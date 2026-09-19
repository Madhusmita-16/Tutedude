# Assignment 8: To-Do List Application (Express.js, Mongoose ODM & React UI)

A full-stack To-Do List web application built with **Express.js**, **MongoDB (Mongoose ODM)**, **Axios**, and **React.js**.

---

## 🚀 Key Features

1. **Express.js REST APIs**: Configured with middleware (`cors`, `express.json()`, `express.static`).
2. **Mongoose ODM**: Active MongoDB schema (`Task.js`) and connection manager (`config/db.js`).
3. **Controller-Service-Routes Architecture**: Decoupled architecture (`routes/`, `controllers/`, `services/`, `models/`).
4. **Axios Integration**: Client-side API calls handled via Axios.
5. **Interactive Edit Modal**: UI modal to edit task title, description, priority, category, and due date.
6. **UI Notification Banners**: Error and success banners rendering directly in the React interface without window alerts.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Express server
npm start
```

Open `http://localhost:3000/` in your browser.
