/**
 * VISITRA - Enterprise System Audit Log Schema
 */

const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
    {
        userEmail: { type: String, required: true },
        role: { type: String, required: true },
        action: { type: String, required: true },
        entity: { type: String, required: true },
        details: { type: String, default: '' },
        ipAddress: { type: String, default: '127.0.0.1' },
        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model('AuditLog', AuditLogSchema);
