/**
 * VISITRA - Analytics & Audit Controller
 */

const analyticsService = require('../services/analyticsService');

exports.getAnalytics = async (req, res) => {
    try {
        const metrics = await analyticsService.getMetrics();
        res.status(200).json({ success: true, metrics });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await analyticsService.getAuditLogs();
        res.status(200).json({ success: true, data: logs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
