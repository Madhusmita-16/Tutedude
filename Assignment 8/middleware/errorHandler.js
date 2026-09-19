/**
 * Assignment 8: Centralized Error Handler Middleware
 */

function errorHandler(err, req, res) {
    console.error(`[ERROR HANDLER] ${err.message}`, err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
}

module.exports = errorHandler;
