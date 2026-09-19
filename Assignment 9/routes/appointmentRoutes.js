const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAppointments);
router.patch('/:id/approve', appointmentController.approveAppointment);
router.patch('/:id/reject', appointmentController.rejectAppointment);

module.exports = router;
