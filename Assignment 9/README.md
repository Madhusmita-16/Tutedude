# Visitor Pass Management System - Assignment 9

A complete full-stack Visitor Pass Management System featuring pre-registration, digital pass generation with dynamic QR codes, role-based access control (RBAC), gatekeeper scanner verification, real-time audit logging, and analytics.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the application server
npm start
```

Open `http://localhost:3000/` in your browser to launch the application.

---

## 🔑 Features & Roles

1. **Visitor Pre-Registration**: Form for visitors or hosts to schedule visits.
2. **Digital Pass & QR Code Badge**: Instant digital badge generation with embedded QR codes.
3. **Gatekeeper Scan Verification**: Check-In and Check-Out timestamped validation.
4. **Role Switcher (RBAC)**: Switch between `Admin`, `Security Gatekeeper`, `Host Staff`, and `Visitor` perspectives.
5. **Real-Time Analytics & Audit Logs**: Active visitors metric, peak time analysis, and audit trails.

---

## 🛠️ Architecture

- **Backend**: Node.js & Express.js REST APIs with JWT Auth Middleware.
- **Database**: MongoDB / Mongoose (with built-in active state in-memory fallback).
- **Frontend**: Single-Page React Application built with White & Blue design system.

---

## 📄 Submission Documentation

See [Assignment_9_Submission_Doc.md](Assignment_9_Submission_Doc.md) for full technical documentation and API specifications.
