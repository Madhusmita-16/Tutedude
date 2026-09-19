/**
 * VISITRA - Auth Controller
 */

const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, role } = req.body;
        const result = await authService.login(email || 'admin@visitra.com', role || 'ADMIN');
        res.status(200).json({ success: true, ...result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await authService.getUsers();
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
