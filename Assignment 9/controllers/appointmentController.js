/**
 * VISITRA - Appointment Controller
 */

const appointmentService = require('../services/appointmentService');

exports.getAppointments = async (req, res) => {
    try {
        const data = await appointmentService.getAppointments();
        res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.approveAppointment = async (req, res) => {
    try {
        const appt = await appointmentService.approveAppointment(req.params.id);
        res.status(200).json({ success: true, message: 'Appointment Approved', data: appt });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.rejectAppointment = async (req, res) => {
    try {
        const appt = await appointmentService.rejectAppointment(req.params.id);
        res.status(200).json({ success: true, message: 'Appointment Rejected', data: appt });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
