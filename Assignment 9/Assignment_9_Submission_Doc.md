# Assignment 9: Build a Visitor Pass Management System (MERN Stack)
**Tutedude Full-Stack Web Development Course**  
**Student Name:** Madhusmita  
**Date:** September 19, 2026  
**Status:** Completed & Tested  
**Repository:** [Madhusmita-16/Tutedude](https://github.com/Madhusmita-16/Tutedude)

---

## 📌 Executive Summary
This document provides a comprehensive report for **Assignment 9: Build a Visitor Pass Management System (MERN Stack)**. The application is designed to modernize and digitize physical visitor logbooks for corporate offices, gated communities, and educational institutions.

The system utilizes the full **MERN stack (MongoDB, Express.js, React.js, Node.js)** featuring:
1. **Pre-Registration & Self Check-In**: Visitors or hosts can schedule visits in advance.
2. **Digital Pass & Dynamic QR Code Generation**: Instant generation of pass badges with embedded encrypted verification payloads.
3. **Role-Based Access Control (RBAC)**: JWT authentication tailored for 4 roles: `Admin`, `Security Gatekeeper`, `Host Staff`, and `Visitor`.
4. **Gatekeeper QR Scanner & Verification**: Fast check-in/out scanning with instant entry validation and blacklist alerts.
5. **Real-Time Analytics & Security Audit Logs**: Live dashboard tracking active visitors, daily check-ins, peak entry times, and complete access audit trails.

---

## 🚀 Key Features & Architectural Matrix

| Feature | Role / Actor | Tech Stack Component | Description |
| :--- | :--- | :--- | :--- |
| **Visitor Pre-Registration** | Visitor / Host | React Frontend + Express REST API | Submit visit details (Name, Email, Phone, Host, Purpose, Photo). |
| **Pass & QR Code Badge** | All | `qrcode` NPM + Dynamic SVG Renderer | Generates digital pass card with QR code encoding Pass ID & Security Key. |
| **Gatekeeper Scanning & Check-In/Out** | Security | Express Controller + Audit Log Model | Scans QR, validates authorization, logs timestamped Entry/Exit logs. |
| **Role Switcher & RBAC** | Admin / Security / Host / Visitor | JWT Tokens + Header Middleware | Interactive role selector demonstrating API permissions for all 4 user types. |
| **Security Audit Logs** | Admin / Security | MongoDB `CheckLog` Collection | Real-time immutable record of check-in and check-out events with duration. |
| **Analytics Dashboard** | Admin | MongoDB Aggregation Pipelines | Displays key metrics: Active Visitors On-Site, Total Visits, Peak Hours, Overstay Alerts. |

---

## 🛠️ Project Structure

```
Assignment 9/
├── config/
│   └── db.js                 # MongoDB connection & in-memory fallback adapter
├── models/
│   ├── User.js               # User authentication & RBAC schema
│   ├── Visitor.js            # Visitor profile & pre-registration schema
│   ├── Pass.js               # Digital Pass badge schema & QR data
│   └── CheckLog.js           # Timestamped Gatekeeper entry/exit audit log
├── controllers/
│   └── visitorController.js  # Business logic for CRUD, Check-in/out, Analytics
├── routes/
│   └── visitorRoutes.js      # REST API route endpoints
├── public/
│   ├── index.html            # Single-Page React UI (Babel + Hooks + Modern UI)
│   └── style.css             # White & Blue responsive design system
├── server.js                 # Express application & API router configuration
├── package.json              # Project dependencies & launch scripts
├── README.md                 # Complete project setup documentation
└── Assignment_9_Submission_Doc.md # Final Submission Documentation
```

---

## 🔌 REST API Reference

### 1. Authentication & Role Switcher
* **POST `/api/visitors/login`**
  * Body: `{ "email": "admin@security.com", "role": "admin" }`
  * Response: Returns JWT token and user profile.

### 2. Visitor & Pass Pre-Registration
* **POST `/api/visitors`**
  * Body: `{ "name": "Sarah Connor", "email": "sarah@cyber.com", "phone": "9876543210", "hostName": "Dr. Silberman", "purpose": "Interview", "expectedDate": "2026-09-20" }`
  * Description: Pre-registers a visitor and automatically creates a digital pass with an embedded QR code payload.

### 3. Digital Pass Verification & QR Badge
* **GET `/api/visitors/passes/:id`**
  * Headers: `Authorization: Bearer <JWT_TOKEN>`
  * Description: Fetches full pass details including SVG/DataURL QR code.

### 4. Gatekeeper QR Scan (Check-In / Check-Out)
* **POST `/api/visitors/check-in`**
  * Body: `{ "passNumber": "VP-1001", "gate": "Gate 1", "scannedBy": "Security Alex" }`
  * Response: `{ "status": "Checked-In", "checkInTime": "2026-09-19T19:00:00Z" }`
* **POST `/api/visitors/check-out`**
  * Body: `{ "passNumber": "VP-1001", "gate": "Gate 1", "scannedBy": "Security Alex" }`
  * Response: `{ "status": "Checked-Out", "checkOutTime": "2026-09-19T19:45:00Z" }`

### 5. Audit Logs & Real-Time Analytics
* **GET `/api/visitors/logs`**
  * Description: Retrieves live audit log of all gate check-in and check-out events.
* **GET `/api/visitors/analytics`**
  * Description: Returns metrics: Active visitors on-site, total daily passes, peak hours, and host breakdown.

---

## 🎨 UI & UX Features
* **White & Blue Professional Palette**: Clean corporate aesthetics featuring rich blue accenting (`#1e40af`, `#3b82f6`), subtle card drop shadows, and high-contrast typography.
* **Role Simulation Panel**: Instant switching between Admin, Security, Host, and Visitor perspectives without logging out.
* **Interactive QR Badge Modal**: Displays high-definition printable pass cards with live status badges (`APPROVED`, `ON-SITE`, `EXPIRED`, `BLACK-LISTED`).
* **One-Click Gate Scanner Demo**: Simulated hardware scanner button for instant verification testing during presentations.

---

## ⚡ Setup & Launch Instructions

### Prerequisites
* Node.js v16+ installed.
* Optional: Local MongoDB running on `mongodb://localhost:27017/` (Includes built-in graceful fallback adapter if MongoDB daemon is absent).

### Installation & Execution
```bash
# Navigate to Assignment 9 directory
cd "f:\works\Tutedude\Assignment 9"

# Install dependencies (Express, Mongoose, Jsonwebtoken, QRcode, Cors)
npm install

# Start the MERN Server
npm start
```

### Accessing the Web App
Open your browser and navigate to:
`http://localhost:3000/`

---

## 📄 Git & Repository Compliance
* **Repository**: [https://github.com/Madhusmita-16/Tutedude](https://github.com/Madhusmita-16/Tutedude)
* **Commit History**: Committed directly under `Assignment 9/` as a distinct git commit line on branch `main`.
* **Zero Zips**: Clean repository structure without archive `.zip` files.
