/**
 * VISITRA - Smart Visitor Management & Digital Pass System
 * Main Express.js Application Server Entry Point
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const checklogRoutes = require('./routes/checklogRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Mongoose Models for Seed Data
const User = require('./models/User');
const Visitor = require('./models/Visitor');
const Appointment = require('./models/Appointment');
const Pass = require('./models/Pass');
const CheckLog = require('./models/CheckLog');
const AuditLog = require('./models/AuditLog');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Express Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React SPA Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Seed Initial Demo Data Function
async function seedInitialData() {
    try {
        if (mongoose.connection.readyState === 1) {
            const userCount = await User.countDocuments();
            if (userCount === 0) {
                console.log('[SEED] Initializing VISITRA production demo seed data...');
                await User.create([
                    { name: 'Admin Operations', email: 'admin@visitra.com', password: 'demo', role: 'ADMIN', department: 'Executive' },
                    { name: 'Security Officer Alex', email: 'security@gate1.com', password: 'demo', role: 'SECURITY', department: 'Facility Security' },
                    { name: 'Sarah Connor', email: 'sarah.connor@corp.com', password: 'demo', role: 'EMPLOYEE', department: 'Engineering' },
                    { name: 'David Miller', email: 'david.miller@corp.com', password: 'demo', role: 'EMPLOYEE', department: 'Product' }
                ]);

                const v1 = await Visitor.create({
                    name: 'Alexander Wright',
                    email: 'alex.wright@techcorp.com',
                    phone: '+1 555-0192',
                    company: 'TechCorp Systems',
                    governmentId: 'PASS-98214',
                    status: 'CHECKED_IN'
                });

                const v2 = await Visitor.create({
                    name: 'Elena Rostova',
                    email: 'elena.r@innovate.org',
                    phone: '+1 555-0184',
                    company: 'Innovate Labs',
                    governmentId: 'PASS-44120',
                    status: 'REGISTERED'
                });

                const appt1 = await Appointment.create({
                    visitorId: v1._id,
                    visitorName: v1.name,
                    visitorEmail: v1.email,
                    hostName: 'Sarah Connor (Eng Director)',
                    purpose: 'Quarterly Architecture Review',
                    scheduledDate: new Date().toISOString().split('T')[0],
                    scheduledTime: '10:00 AM',
                    status: 'APPROVED'
                });

                const appt2 = await Appointment.create({
                    visitorId: v2._id,
                    visitorName: v2.name,
                    visitorEmail: v2.email,
                    hostName: 'David Miller (Product Lead)',
                    purpose: 'Partnership Agreement Discussion',
                    scheduledDate: new Date().toISOString().split('T')[0],
                    scheduledTime: '02:30 PM',
                    status: 'PENDING'
                });

                const p1 = await Pass.create({
                    visitorId: v1._id,
                    appointmentId: appt1._id,
                    passNumber: 'VP-2026-1001',
                    qrToken: 'VISITRA_PASS_VP-2026-1001_SECURE',
                    visitorName: v1.name,
                    hostName: appt1.hostName,
                    purpose: appt1.purpose,
                    validFrom: '09:00 AM',
                    validUntil: '06:00 PM',
                    status: 'CHECKED_IN'
                });

                await Pass.create({
                    visitorId: v2._id,
                    appointmentId: appt2._id,
                    passNumber: 'VP-2026-1002',
                    qrToken: 'VISITRA_PASS_VP-2026-1002_SECURE',
                    visitorName: v2.name,
                    hostName: appt2.hostName,
                    purpose: appt2.purpose,
                    validFrom: '02:00 PM',
                    validUntil: '06:00 PM',
                    status: 'ACTIVE'
                });

                await CheckLog.create({
                    passNumber: p1.passNumber,
                    visitorName: p1.visitorName,
                    action: 'CHECK_IN',
                    scannedBy: 'Security Officer Alex',
                    location: 'Main HQ Gate 1'
                });

                await AuditLog.create([
                    { userEmail: 'admin@visitra.com', role: 'ADMIN', action: 'SYSTEM_INITIALIZED', entity: 'System', details: 'VISITRA system seed data ready' },
                    { userEmail: 'security@gate1.com', role: 'SECURITY', action: 'VISITOR_CHECK_IN', entity: 'Pass', details: 'Checked in Alexander Wright' }
                ]);

                console.log('[SEED] Seed data successfully populated.');
            }
        }
    } catch (err) {
        console.log('[SEED] Seed check:', err.message);
    }
}

seedInitialData();

// Mount API Modules
app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/checklogs', checklogRoutes);
app.use('/api/analytics', analyticsRoutes);

// SPA Route Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 VISITRA Smart Visitor System running at http://localhost:${PORT}`);
    console.log(`📌 Features Active: RBAC, QR Passes, Gate Scanner, Analytics & PDF Badge`);
    console.log(`====================================================`);
});
