/**
 * Assignment 6: Creating a Simple Web Server with Node.js
 * 
 * Objective: Build a basic web server using the Node.js http module to handle
 * different routes (/home, /about, /contact, /services) and serve corresponding HTML pages.
 * 
 * Core Features:
 * - Pure Node.js built-in `http`, `fs`, `path`, and `url` modules.
 * - Asynchronous file reading using `fs.readFile`.
 * - Route matching for /, /home, /about, /services, /contact.
 * - Custom 404 page for unmatched routes with HTTP status code 404.
 * - Dynamic Content-Type headers based on file extension (.html, .css, .js, .json, .png).
 * - Comprehensive error handling and server logging.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types dictionary for dynamic Content-Type headers
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

// Route mapping configuration for HTML pages
const ROUTE_MAP = {
    '/': 'index.html',
    '/home': 'index.html',
    '/about': 'about.html',
    '/services': 'services.html',
    '/contact': 'contact.html'
};

/**
 * Serves static files asynchronously and returns appropriate HTTP responses.
 * 
 * @param {string} fileName - Name of the file inside public directory
 * @param {number} statusCode - HTTP status code (e.g. 200, 404, 500)
 * @param {http.ServerResponse} res - HTTP response object
 */
function serveFile(fileName, statusCode, res) {
    const filePath = path.join(PUBLIC_DIR, fileName);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Fallback error response if file cannot be read
            if (statusCode === 404 && err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested page was not found.</p>');
                return;
            }

            console.error(`[SERVER ERROR] Failed to read file: ${filePath}`, err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1><p>An unexpected error occurred on the server.</p>');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Create HTTP Server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname.toLowerCase();

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${pathname}`);

    // Serve CSS or static assets directly from public folder
    if (pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.endsWith('.png') || pathname.endsWith('.ico')) {
        const assetPath = path.join(PUBLIC_DIR, pathname);
        fs.access(assetPath, fs.constants.F_OK, (err) => {
            if (err) {
                serveFile('404.html', 404, res);
            } else {
                serveFile(pathname, 200, res);
            }
        });
        return;
    }

    // Check route map for HTML pages
    if (ROUTE_MAP.hasOwnProperty(pathname)) {
        serveFile(ROUTE_MAP[pathname], 200, res);
    } else {
        // Unmatched route -> Serve custom 404 page with HTTP status code 404
        serveFile('404.html', 404, res);
    }
});

// Start listening on specified port
server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 6 Node.js Server is running!`);
    console.log(`🌐 Server Listening at: http://localhost:${PORT}`);
    console.log(`📌 Available Routes:`);
    console.log(`   - http://localhost:${PORT}/home`);
    console.log(`   - http://localhost:${PORT}/about`);
    console.log(`   - http://localhost:${PORT}/services`);
    console.log(`   - http://localhost:${PORT}/contact`);
    console.log(`   - http://localhost:${PORT}/invalid-route (404 Page)`);
    console.log(`====================================================`);
});
