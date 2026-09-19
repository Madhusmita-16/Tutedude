/**
 * VISITRA - Appointment Schema Model
 * Statuses: PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED
 */

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
    {
        visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
        visitorName: { type: String, required: true },
        visitorEmail: { type: String, required: true },
        hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        hostName: { type: String, required: true },
        purpose: { type: String, required: true },
        location: { type: String, default: 'Main HQ Gate 1' },
        scheduledDate: { type: String, required: true },
        scheduledTime: { type: String, required: true },
        status: { 
            type: String, 
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED'], 
            default: 'PENDING' 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
