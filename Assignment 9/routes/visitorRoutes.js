/**
 * Assignment 9: Visitor & Pass Routes Dispatcher
 */

const visitorController = require('../controllers/visitorController');

function handleVisitorRoutes(req, res, pathname, method) {
    // 1. GET /api/analytics
    if (method === 'GET' && pathname === '/api/analytics') {
        return visitorController.getAnalytics(req, res);
    }

    // 2. GET /api/visitors
    if (method === 'GET' && pathname === '/api/visitors') {
        return visitorController.getVisitors(req, res);
    }

    // 3. POST /api/visitors/register
    if (method === 'POST' && pathname === '/api/visitors/register') {
        return visitorController.registerVisitor(req, res);
    }

    // 4. GET /api/passes
    if (method === 'GET' && pathname === '/api/passes') {
        return visitorController.getPasses(req, res);
    }

    // 5. POST /api/passes/checkin
    if (method === 'POST' && pathname === '/api/passes/checkin') {
        return visitorController.checkInPass(req, res);
    }

    // 6. POST /api/passes/checkout
    if (method === 'POST' && pathname === '/api/passes/checkout') {
        return visitorController.checkOutPass(req, res);
    }

    // 7. GET /api/checklogs
    if (method === 'GET' && pathname === '/api/checklogs') {
        return visitorController.getCheckLogs(req, res);
    }

    return false;
}

module.exports = handleVisitorRoutes;
