/**
 * VISITRA - Gatekeeper Check-In / Check-Out Audit Log Schema
 */

const mongoose = require('mongoose');

const CheckLogSchema = new mongoose.Schema(
    {
        passNumber: { type: String, required: true },
        visitorName: { type: String, required: true },
        action: { type: String, enum: ['CHECK_IN', 'CHECK_OUT'], required: true },
        scannedBy: { type: String, default: 'Gate 1 Security Scanner' },
        location: { type: String, default: 'Building A Front Gate' },
        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model('CheckLog', CheckLogSchema);
