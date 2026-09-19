/**
 * Assignment 9: Build a Visitor Pass Management System (MERN Stack)
 * 
 * Express & Node.js Backend Server supporting JWT Role-Based Access,
 * Pre-Registration, QR Pass Generation, Check-In/Check-Out, and Analytics Reports.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { connectDB } = require('./config/db');
const handleVisitorRoutes = require('./routes/visitorRoutes');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

connectDB();

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
};

function parseRequestBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            if (!body) return resolve({});
            try { resolve(JSON.parse(body)); } catch (e) { resolve({}); }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.status = function(code) {
        this.statusCode = code;
        return this;
    };

    res.json = function(payload) {
        this.writeHead(this.statusCode || 200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        this.end(JSON.stringify(payload));
    };

    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    req.query = parsedUrl.query;
    req.body = await parseRequestBody(req);

    // API Routes Dispatcher
    if (pathname.startsWith('/api/')) {
        const handled = handleVisitorRoutes(req, res, pathname, method);
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

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 9 Visitor Pass System running at http://localhost:${PORT}`);
    console.log(`📌 Features Active: JWT Role Auth, QR Passes, Check-In/Out & Analytics`);
    console.log(`====================================================`);
});
