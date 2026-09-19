/**
 * Assignment 8: Express.js & Node.js Main Server Entry Point
 * 
 * Objective: Build a complete backend for a To-Do List application using Node.js,
 * Express architecture, MongoDB configuration, and integrated React Frontend.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { connectDB } = require('./config/db');
const handleTaskRoutes = require('./routes/taskRoutes');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Connect Database
connectDB();

// MIME Types Map
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
};

// Helper: Parse Request Body JSON
function parseRequestBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                resolve({});
            }
        });
    });
}

// Create Server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Response Helper Methods (.status().json())
    res.status = function(code) {
        this.statusCode = code;
        return this;
    };
    res.json = function(payload) {
        this.writeHead(this.statusCode || 200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        this.end(JSON.stringify(payload));
    };

    // CORS Preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    req.query = parsedUrl.query;
    req.body = await parseRequestBody(req);

    // Dispatch REST Routes
    if (pathname.startsWith('/api/tasks')) {
        const handled = handleTaskRoutes(req, res, pathname, method);
        if (handled !== false) return;
    }

    // Static Asset Handler
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested route or asset was not found.</p>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start Listening
server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 8 Server running at http://localhost:${PORT}`);
    console.log(`📌 To-Do List APIs & React Frontend Integrated:`);
    console.log(`   - Web App UI: http://localhost:${PORT}/`);
    console.log(`   - REST APIs: http://localhost:${PORT}/api/tasks`);
    console.log(`====================================================`);
});
