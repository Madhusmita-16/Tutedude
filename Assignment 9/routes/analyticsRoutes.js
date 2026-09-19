const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/metrics', analyticsController.getAnalytics);
router.get('/audit-logs', analyticsController.getAuditLogs);

module.exports = router;
