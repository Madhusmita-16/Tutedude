/**
 * VISITRA - Digital Visitor Pass Schema Model
 */

const mongoose = require('mongoose');

const PassSchema = new mongoose.Schema(
    {
        visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
        appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
        passNumber: { type: String, required: true, unique: true },
        qrToken: { type: String, required: true },
        visitorName: { type: String, required: true },
        hostName: { type: String, required: true },
        purpose: { type: String, default: 'Business Meeting' },
        validFrom: { type: String, required: true },
        validUntil: { type: String, required: true },
        status: { type: String, enum: ['ACTIVE', 'CHECKED_IN', 'EXPIRED', 'REVOKED'], default: 'ACTIVE' },
        issuedBy: { type: String, default: 'System Pre-Registration' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Pass', PassSchema);
