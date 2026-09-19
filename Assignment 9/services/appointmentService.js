/**
 * VISITRA - Appointment Service Layer
 */

const Appointment = require('../models/Appointment');
const AuditLog = require('../models/AuditLog');
const mongoose = require('mongoose');

let activeApptsStore = [
    {
        _id: 'appt-101',
        visitorName: 'Alexander Wright',
        visitorEmail: 'alex.wright@techcorp.com',
        hostName: 'Sarah Connor (Eng Director)',
        purpose: 'Quarterly Architecture Review',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '10:00 AM',
        status: 'APPROVED'
    },
    {
        _id: 'appt-102',
        visitorName: 'Elena Rostova',
        visitorEmail: 'elena.r@innovate.org',
        hostName: 'David Miller (Product Lead)',
        purpose: 'Partnership Agreement Discussion',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '02:30 PM',
        status: 'PENDING'
    }
];

class AppointmentService {
    async getAppointments() {
        if (mongoose.connection.readyState === 1) {
            return await Appointment.find().sort({ createdAt: -1 });
        } else {
            return activeApptsStore;
        }
    }

    async approveAppointment(id) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            return await Appointment.findByIdAndUpdate(id, { status: 'APPROVED' }, { new: true });
        } else {
            const appt = activeApptsStore.find(a => a._id === id);
            if (appt) appt.status = 'APPROVED';
            return appt;
        }
    }

    async rejectAppointment(id) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            return await Appointment.findByIdAndUpdate(id, { status: 'REJECTED' }, { new: true });
        } else {
            const appt = activeApptsStore.find(a => a._id === id);
            if (appt) appt.status = 'REJECTED';
            return appt;
        }
    }
}

module.exports = new AppointmentService();
