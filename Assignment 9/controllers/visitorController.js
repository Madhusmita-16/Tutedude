/**
 * VISITRA - Visitor Controller
 */

const visitorService = require('../services/visitorService');

exports.getVisitors = async (req, res) => {
    try {
        const { search } = req.query;
        const visitors = await visitorService.getAllVisitors(search);
        res.status(200).json({ success: true, count: visitors.length, data: visitors });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.registerVisitor = async (req, res) => {
    try {
        const { name, email, phone, company, hostName, purpose } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, error: 'Name, Email, and Phone are required' });
        }
        const result = await visitorService.registerVisitor({ name, email, phone, company, hostName, purpose });
        res.status(201).json({ success: true, message: 'Visitor registered & Digital Pass issued', data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
