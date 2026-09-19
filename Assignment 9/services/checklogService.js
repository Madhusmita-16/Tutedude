/**
 * VISITRA - CheckLog & Security Scanner Service Layer
 */

const Pass = require('../models/Pass');
const Visitor = require('../models/Visitor');
const CheckLog = require('../models/CheckLog');
const AuditLog = require('../models/AuditLog');
const mongoose = require('mongoose');

let activeCheckLogsStore = [
    {
        _id: 'log-101',
        passNumber: 'VP-2026-1001',
        visitorName: 'Alexander Wright',
        action: 'CHECK_IN',
        scannedBy: 'Security Officer Alex',
        timestamp: new Date()
    }
];

let activePassesStore = [
    {
        _id: 'pass-101',
        passNumber: 'VP-2026-1001',
        qrToken: 'VISITRA_PASS_VP-2026-1001_SECURE',
        visitorName: 'Alexander Wright',
        hostName: 'Sarah Connor (Eng Director)',
        purpose: 'Quarterly Architecture Review',
        status: 'CHECKED_IN'
    },
    {
        _id: 'pass-102',
        passNumber: 'VP-2026-1002',
        qrToken: 'VISITRA_PASS_VP-2026-1002_SECURE',
        visitorName: 'Elena Rostova',
        hostName: 'David Miller (Product Lead)',
        purpose: 'Partnership Agreement Discussion',
        status: 'ACTIVE'
    }
];

class CheckLogService {
    async scanAndValidatePass(passCode) {
        if (mongoose.connection.readyState === 1) {
            const pass = await Pass.findOne({ $or: [{ passNumber: passCode }, { qrToken: passCode }] });
            if (!pass) return { valid: false, error: 'INVALID_PASS: No pass record found with scanned code.' };
            return { valid: true, pass, message: `VALID PASS: ${pass.visitorName} visiting ${pass.hostName}` };
        } else {
            const pass = activePassesStore.find(p => p.passNumber === passCode || p.qrToken === passCode);
            if (!pass) return { valid: false, error: 'INVALID_PASS: Scanned code not recognized.' };
            return { valid: true, pass, message: `VALID PASS: ${pass.visitorName} visiting ${pass.hostName}` };
        }
    }

    async processCheckIn(passCode, scannedBy) {
        if (mongoose.connection.readyState === 1) {
            const val = await this.scanAndValidatePass(passCode);
            if (!val.valid) return val;
            const pass = val.pass;
            if (pass.status === 'CHECKED_IN') return { valid: false, error: `ALREADY_CHECKED_IN: Visitor ${pass.visitorName} is already inside HQ.` };
            pass.status = 'CHECKED_IN';
            await pass.save();
            await Visitor.findByIdAndUpdate(pass.visitorId, { status: 'CHECKED_IN' });
            const log = await CheckLog.create({ passNumber: pass.passNumber, visitorName: pass.visitorName, action: 'CHECK_IN', scannedBy: scannedBy || 'Security Gate 1' });
            return { valid: true, message: `CHECK-IN SUCCESSFUL for ${pass.visitorName}`, log, pass };
        } else {
            const pass = activePassesStore.find(p => p.passNumber === passCode || p.qrToken === passCode);
            if (!pass) return { valid: false, error: 'INVALID_PASS: Scanned code not recognized.' };
            if (pass.status === 'CHECKED_IN') return { valid: false, error: `ALREADY_CHECKED_IN: Visitor ${pass.visitorName} is already inside HQ.` };
            pass.status = 'CHECKED_IN';
            const log = { _id: 'log-' + Date.now(), passNumber: pass.passNumber, visitorName: pass.visitorName, action: 'CHECK_IN', scannedBy: scannedBy || 'Security Gate 1', timestamp: new Date() };
            activeCheckLogsStore.unshift(log);
            return { valid: true, message: `CHECK-IN SUCCESSFUL for ${pass.visitorName}`, log, pass };
        }
    }

    async processCheckOut(passCode, scannedBy) {
        if (mongoose.connection.readyState === 1) {
            const pass = await Pass.findOne({ $or: [{ passNumber: passCode }, { qrToken: passCode }] });
            if (!pass) return { valid: false, error: 'INVALID_PASS: Scanned code not recognized.' };
            pass.status = 'EXPIRED';
            await pass.save();
            await Visitor.findByIdAndUpdate(pass.visitorId, { status: 'CHECKED_OUT' });
            const log = await CheckLog.create({ passNumber: pass.passNumber, visitorName: pass.visitorName, action: 'CHECK_OUT', scannedBy: scannedBy || 'Security Gate 1' });
            return { valid: true, message: `CHECK-OUT SUCCESSFUL for ${pass.visitorName}`, log, pass };
        } else {
            const pass = activePassesStore.find(p => p.passNumber === passCode || p.qrToken === passCode);
            if (!pass) return { valid: false, error: 'INVALID_PASS: Scanned code not recognized.' };
            pass.status = 'EXPIRED';
            const log = { _id: 'log-' + Date.now(), passNumber: pass.passNumber, visitorName: pass.visitorName, action: 'CHECK_OUT', scannedBy: scannedBy || 'Security Gate 1', timestamp: new Date() };
            activeCheckLogsStore.unshift(log);
            return { valid: true, message: `CHECK-OUT SUCCESSFUL for ${pass.visitorName}`, log, pass };
        }
    }

    async getCheckLogs() {
        if (mongoose.connection.readyState === 1) {
            return await CheckLog.find().sort({ timestamp: -1 });
        } else {
            return activeCheckLogsStore;
        }
    }
}

module.exports = new CheckLogService();
