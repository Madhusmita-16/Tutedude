const express = require('express');
const router = express.Router();
const checklogController = require('../controllers/checklogController');

router.post('/scan', checklogController.scanPass);
router.post('/check-in', checklogController.checkIn);
router.post('/check-out', checklogController.checkOut);
router.get('/logs', checklogController.getLogs);

module.exports = router;
