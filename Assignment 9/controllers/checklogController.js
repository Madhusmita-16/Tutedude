/**
 * VISITRA - Gatekeeper Scanner & CheckLog Controller
 */

const checklogService = require('../services/checklogService');

exports.scanPass = async (req, res) => {
    try {
        const { passCode } = req.body;
        const result = await checklogService.scanAndValidatePass(passCode);
        res.status(result.valid ? 200 : 400).json(result);
    } catch (err) {
        res.status(500).json({ valid: false, error: err.message });
    }
};

exports.checkIn = async (req, res) => {
    try {
        const { passCode, scannedBy } = req.body;
        const result = await checklogService.processCheckIn(passCode, scannedBy);
        res.status(result.valid ? 200 : 400).json(result);
    } catch (err) {
        res.status(500).json({ valid: false, error: err.message });
    }
};

exports.checkOut = async (req, res) => {
    try {
        const { passCode, scannedBy } = req.body;
        const result = await checklogService.processCheckOut(passCode, scannedBy);
        res.status(result.valid ? 200 : 400).json(result);
    } catch (err) {
        res.status(500).json({ valid: false, error: err.message });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await checklogService.getCheckLogs();
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
