/**
 * Assignment 9: Visitor & Pass Controller Logic
 */

const VisitorModel = require('../models/Visitor');
const PassModel = require('../models/Pass');
const CheckLogModel = require('../models/CheckLog');

// In-Memory Data Store initialized with demo seed data
let visitorsStore = [
    new VisitorModel({
        name: "Alexander Wright",
        email: "alex.wright@techcorp.com",
        phone: "+1 555-0192",
        organization: "TechCorp Systems",
        hostEmployee: "Sarah Connor (Eng Director)",
        purpose: "Quarterly Architecture Review",
        visitDate: new Date().toISOString().split('T')[0]
    }),
    new VisitorModel({
        name: "Elena Rostova",
        email: "elena.r@innovate.org",
        phone: "+1 555-0184",
        organization: "Innovate Labs",
        hostEmployee: "David Miller (Product Lead)",
        purpose: "Partnership Agreement Discussion",
        visitDate: new Date().toISOString().split('T')[0]
    })
];

let passesStore = [
    new PassModel({
        visitorId: visitorsStore[0].id,
        visitorName: visitorsStore[0].name,
        hostEmployee: visitorsStore[0].hostEmployee,
        purpose: visitorsStore[0].purpose
    }),
    new PassModel({
        visitorId: visitorsStore[1].id,
        visitorName: visitorsStore[1].name,
        hostEmployee: visitorsStore[1].hostEmployee,
        purpose: visitorsStore[1].purpose
    })
];

let checkLogsStore = [
    new CheckLogModel({
        passCode: passesStore[0].passCode,
        visitorName: passesStore[0].visitorName,
        action: "CHECK-IN",
        scannerRole: "Security Guard Gate 1"
    })
];

// Mark first visitor as Checked-In
visitorsStore[0].status = 'Checked-In';

// GET /api/visitors - Get visitors list
exports.getVisitors = (req, res) => {
    let result = [...visitorsStore];
    const { status, query } = req.query;

    if (status && status !== 'all') {
        result = result.filter(v => v.status.toLowerCase() === status.toLowerCase());
    }

    if (query) {
        const q = query.toLowerCase().trim();
        result = result.filter(v => 
            v.name.toLowerCase().includes(q) || 
            v.email.toLowerCase().includes(q) ||
            v.organization.toLowerCase().includes(q) ||
            v.hostEmployee.toLowerCase().includes(q)
        );
    }

    res.status(200).json({ success: true, count: result.length, data: result });
};

// POST /api/visitors/register - Pre-register visitor & issue digital pass
exports.registerVisitor = (req, res) => {
    const { name, email, phone, organization, hostEmployee, purpose } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, error: 'Name, Email, and Phone number are required' });
    }

    const newVisitor = new VisitorModel({ name, email, phone, organization, hostEmployee, purpose });
    visitorsStore.unshift(newVisitor);

    const newPass = new PassModel({
        visitorId: newVisitor.id,
        visitorName: newVisitor.name,
        hostEmployee: newVisitor.hostEmployee,
        purpose: newVisitor.purpose
    });
    passesStore.unshift(newPass);

    res.status(201).json({
        success: true,
        message: 'Visitor pre-registered and digital pass issued successfully',
        data: {
            visitor: newVisitor,
            pass: newPass
        }
    });
};

// POST /api/passes/checkin - Scan QR / Pass Code Check-In
exports.checkInPass = (req, res) => {
    const { passCode } = req.body;
    if (!passCode) {
        return res.status(400).json({ success: false, error: 'Pass code is required' });
    }

    const pass = passesStore.find(p => p.passCode.toUpperCase() === passCode.toUpperCase().trim());
    if (!pass) {
        return res.status(404).json({ success: false, error: `Pass code '${passCode}' not found` });
    }

    const visitor = visitorsStore.find(v => v.id === pass.visitorId);
    if (visitor) {
        visitor.status = 'Checked-In';
    }

    const log = new CheckLogModel({
        passCode: pass.passCode,
        visitorName: pass.visitorName,
        action: "CHECK-IN",
        scannerRole: "Frontdesk / Security"
    });
    checkLogsStore.unshift(log);

    res.status(200).json({
        success: true,
        message: `Visitor '${pass.visitorName}' checked in successfully`,
        data: { pass, visitor, log }
    });
};

// POST /api/passes/checkout - Scan QR / Pass Code Check-Out
exports.checkOutPass = (req, res) => {
    const { passCode } = req.body;
    if (!passCode) {
        return res.status(400).json({ success: false, error: 'Pass code is required' });
    }

    const pass = passesStore.find(p => p.passCode.toUpperCase() === passCode.toUpperCase().trim());
    if (!pass) {
        return res.status(404).json({ success: false, error: `Pass code '${passCode}' not found` });
    }

    const visitor = visitorsStore.find(v => v.id === pass.visitorId);
    if (visitor) {
        visitor.status = 'Checked-Out';
    }

    pass.status = 'EXPIRED';

    const log = new CheckLogModel({
        passCode: pass.passCode,
        visitorName: pass.visitorName,
        action: "CHECK-OUT",
        scannerRole: "Frontdesk / Security"
    });
    checkLogsStore.unshift(log);

    res.status(200).json({
        success: true,
        message: `Visitor '${pass.visitorName}' checked out successfully`,
        data: { pass, visitor, log }
    });
};

// GET /api/passes - Get all digital passes
exports.getPasses = (req, res) => {
    res.status(200).json({ success: true, count: passesStore.length, data: passesStore });
};

// GET /api/checklogs - Get check-in / check-out audit logs
exports.getCheckLogs = (req, res) => {
    res.status(200).json({ success: true, count: checkLogsStore.length, data: checkLogsStore });
};

// GET /api/analytics - Get system summary reports & metrics
exports.getAnalytics = (req, res) => {
    const totalVisitors = visitorsStore.length;
    const checkedInCount = visitorsStore.filter(v => v.status === 'Checked-In').length;
    const checkedOutCount = visitorsStore.filter(v => v.status === 'Checked-Out').length;
    const activePassesCount = passesStore.filter(p => p.status === 'ACTIVE').length;

    res.status(200).json({
        success: true,
        metrics: {
            totalVisitors,
            checkedInCount,
            checkedOutCount,
            activePassesCount
        },
        recentLogs: checkLogsStore.slice(0, 5)
    });
};
