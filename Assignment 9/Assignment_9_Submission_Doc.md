# Assignment 9: VISITRA — Smart Visitor Management & Digital Pass System (Production MERN Stack)
**Tutedude Full-Stack Web Development Course**  
**Student Name:** Madhusmita  
**Date:** September 19, 2026  
**Status:** Completed & Tested  
**Repository:** [Madhusmita-16/Tutedude](https://github.com/Madhusmita-16/Tutedude)

---

## 📌 Executive Summary
**VISITRA** is a production-style, enterprise-grade **Visitor Pass Management System** built with the complete **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It replaces traditional paper visitor logs with an end-to-end digital ecosystem:

1. **Visitor Pre-Registration & Self Service**: Visitors schedule visits online and receive dynamic digital passes.
2. **Dynamic QR Pass Generation & PDF Badge**: Encrypted QR code badge generation for instant scanning.
3. **Role-Based Access Control (RBAC)**: Fine-grained authorization logic for 4 distinct roles:
   - **`ADMIN`**: Enterprise metrics, analytics, audit log inspection, and CSV report export.
   - **`SECURITY`**: Gatekeeper QR scanner, check-in validation, check-out processing, and live roster.
   - **`EMPLOYEE`**: Host appointment manager with interactive Approval and Rejection workflows.
   - **`VISITOR`**: Pre-registration portal, digital pass badge preview, and printable PDF pass.
4. **Gatekeeper QR Scanner & Security Verification**: Real-time pass status checks (`ACTIVE`, `CHECKED_IN`, `EXPIRED`, `BLACK_LISTED`) to prevent duplicate entry/exit.
5. **Real-Time Analytics & Audit Trails**: Live dashboard tracking on-site visitors, active passes, and immutable system event logs.

---

## 🛠️ Architecture & Directory Structure

```
Assignment 9/
├── config/
│   └── db.js                 # Mongoose connection manager (mongodb://127.0.0.1:27017/visitra_db)
├── models/
│   ├── User.js               # RBAC User schema (ADMIN, SECURITY, EMPLOYEE, VISITOR)
│   ├── Visitor.js            # Visitor profile schema
│   ├── Appointment.js        # Appointment schema (PENDING, APPROVED, REJECTED)
│   ├── Pass.js               # Digital Pass & QR token schema
│   ├── CheckLog.js           # Gatekeeper entry/exit log schema
│   └── AuditLog.js           # Enterprise system audit event schema
├── services/
│   ├── authService.js        # JWT token generation & authentication service
│   ├── visitorService.js     # Pre-registration & pass creation service
│   ├── appointmentService.js # Host approval workflow service
│   ├── checklogService.js    # QR Scanner & Gate validation service
│   └── analyticsService.js   # Analytics metrics & audit trail service
├── controllers/
│   ├── authController.js     # Express Auth handler
│   ├── visitorController.js  # Visitor REST handler
│   ├── appointmentController.js # Host Appointment REST handler
│   ├── checklogController.js # Scanner Check-In/Out handler
│   └── analyticsController.js # Metrics & Audit Log handler
├── routes/
│   ├── authRoutes.js         # /api/auth endpoints
│   ├── visitorRoutes.js      # /api/visitors endpoints
│   ├── appointmentRoutes.js  # /api/appointments endpoints
│   ├── checklogRoutes.js     # /api/checklogs endpoints
│   └── analyticsRoutes.js    # /api/analytics endpoints
├── public/
│   ├── index.html            # Production React SPA with Axios & Role Switcher
│   └── style.css             # White & Blue corporate design system
├── server.js                 # Express server with automatic demo seed data initialization
├── package.json              # Project dependencies & launch scripts
├── README.md                 # Project Setup & Guide
└── Assignment_9_Submission_Doc.md # Final Submission Documentation
```

---

## 🔌 REST API Reference

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & issue JWT token. |
| **Visitors** | `GET` | `/api/visitors` | List registered visitors with search filter. |
| **Visitors** | `POST` | `/api/visitors/register` | Pre-register visitor & issue digital pass badge. |
| **Appointments**| `GET` | `/api/appointments` | Retrieve host appointment invitations. |
| **Appointments**| `PATCH` | `/api/appointments/:id/approve` | Host approves visitor appointment. |
| **Appointments**| `PATCH` | `/api/appointments/:id/reject` | Host rejects visitor appointment. |
| **Scanner** | `POST` | `/api/checklogs/scan` | Validate scanned QR code token. |
| **Scanner** | `POST` | `/api/checklogs/check-in` | Execute visitor gate check-in. |
| **Scanner** | `POST` | `/api/checklogs/check-out` | Execute visitor gate check-out. |
| **Scanner** | `GET` | `/api/checklogs/logs` | Retrieve entry/exit log history. |
| **Analytics** | `GET` | `/api/analytics/metrics` | Retrieve real-time dashboard metrics. |
| **Analytics** | `GET` | `/api/analytics/audit-logs` | Retrieve enterprise audit trail. |

---

## ⚡ Setup & Execution Instructions

### 1. Install Dependencies
```bash
cd "f:\works\Tutedude\Assignment 9"
npm install
```

### 2. Launch VISITRA Server
```bash
npm start
```

### 3. Open Application
Navigate to [http://localhost:3000/](http://localhost:3000/) in your web browser.

---

## 📄 Repository Compliance
- **Repository**: [https://github.com/Madhusmita-16/Tutedude](https://github.com/Madhusmita-16/Tutedude)
- **Git Branch**: `main`
- **Commit History**: Committed directly under `Assignment 9/` as a distinct git commit line.
