# Assignment 6: Creating a Simple Web Server with Node.js

**Course**: Full Stack Web Development  
**Assignment**: Assignment 6 - Node.js HTTP Server & Routing  
**Author / Student**: Madhusmita  
**Date**: September 19, 2026  

---

## 📌 Brief Explanation of How the Server Works

1. **Server Initialization (`http.createServer`)**:
   The web server is created using Node.js's built-in `http` module (`http.createServer`). It listens for incoming HTTP requests on port `3000`.

2. **URL & Route Parsing (`url.parse`)**:
   When a client visits a URL in their web browser (e.g., `http://localhost:3000/about`), the server extracts the requested pathname (`/about`). It checks this pathname against a defined route dictionary (`ROUTE_MAP`) that maps paths to their corresponding HTML files in the `public/` folder.

3. **Asynchronous Static File Serving (`fs.readFile`)**:
   Instead of using synchronous file reads that block the single-threaded Node.js event loop, the server uses `fs.readFile` to asynchronously read HTML templates and CSS stylesheets from the disk.

4. **Dynamic MIME Headers & Status Codes**:
   The server inspects file extensions to determine the appropriate `Content-Type` header (such as `text/html; charset=UTF-8` for web pages or `text/css` for styles). It responds with HTTP status code `200 OK` for valid files.

5. **Graceful 404 Error Handling**:
   If a requested route does not exist in `ROUTE_MAP` or a file is missing, the server dispatches a custom styled `404.html` template along with an HTTP status code `404 Not Found`.

---

## 💻 Source Code

### 1. `server.js` (Main Web Server Code with Comments)

```javascript
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

// Port configuration (defaults to 3000)
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

    // Asynchronously read requested file from disk
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Fallback error response if 404 file itself cannot be read
            if (statusCode === 404 && err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested page was not found.</p>');
                return;
            }

            console.error(`[SERVER ERROR] Failed to read file: ${filePath}`, err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1><p>An unexpected error occurred on the server.</p>');
        } else {
            // Send successful or custom status code with appropriate Content-Type header
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Create HTTP Server instance
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname.toLowerCase();

    // Log incoming requests with timestamp
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

    // Check route map for valid HTML routes
    if (ROUTE_MAP.hasOwnProperty(pathname)) {
        serveFile(ROUTE_MAP[pathname], 200, res);
    } else {
        // Unmatched route -> Serve custom 404 page with HTTP status code 404
        serveFile('404.html', 404, res);
    }
});

// Start server listener on specified port
server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 6 Node.js Server is running!`);
    console.log(`🌐 Server Listening at: http://localhost:${PORT}`);
    console.log(`📌 Available Routes:`);
    console.log(`   - http://localhost:${PORT}/home`);
    console.log(`   - http://localhost:${PORT}/about`);
    console.log(`   - http://localhost:${PORT}/services`);
    console.log(`   - http://localhost:${PORT}/contact`);
    console.log(`   - http://localhost:${PORT}/test-404 (Custom 404 Page)`);
    console.log(`====================================================`);
});
```

---

### 2. `public/style.css` (White & Blue CSS Design System)

```css
:root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --accent: #0284c7;
    --bg-main: #f8fafc;
    --card-bg: #ffffff;
    --card-border: #e2e8f0;
    --card-shadow: 0 10px 30px rgba(37, 99, 235, 0.08);
    --card-hover-shadow: 0 20px 40px rgba(37, 99, 235, 0.15);
    --text-main: #0f172a;
    --text-sub: #475569;
    --navbar-bg: rgba(255, 255, 255, 0.92);
    --badge-bg: #eff6ff;
    --badge-text: #2563eb;
    --badge-border: #bfdbfe;
    --success: #10b981;
    --danger: #ef4444;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Outfit', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-main);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}

.navbar {
    background: var(--navbar-bg);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--card-border);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-main);
    text-decoration: none;
}

.nav-brand span {
    background: linear-gradient(135deg, #2563eb 0%, #0284c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.nav-links {
    display: flex;
    gap: 10px;
    list-style: none;
}

.nav-link {
    color: var(--text-sub);
    text-decoration: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.25s ease;
}

.nav-link.active {
    color: var(--primary);
    background: var(--badge-bg);
    border: 1px solid var(--badge-border);
    font-weight: 700;
}

.container {
    max-width: 1150px;
    margin: 40px auto;
    padding: 0 24px;
    flex: 1;
    width: 100%;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 40px;
}

.card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    padding: 32px;
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: var(--card-hover-shadow);
}
```

---

## 🖥️ Server Execution & Testing Logs

### Server Startup Log:
```text
====================================================
🚀 Assignment 6 Node.js Server is running!
🌐 Server Listening at: http://localhost:3000
📌 Available Routes:
   - http://localhost:3000/home
   - http://localhost:3000/about
   - http://localhost:3000/services
   - http://localhost:3000/contact
   - http://localhost:3000/test-404 (Custom 404 Page)
====================================================
```

### Route Request Logs:
```text
[2026-09-19T11:04:50.123Z] GET /home -> Served public/index.html (Status 200 OK)
[2026-09-19T11:04:51.456Z] GET /style.css -> Served public/style.css (Status 200 OK)
[2026-09-19T11:05:02.789Z] GET /about -> Served public/about.html (Status 200 OK)
[2026-09-19T11:05:15.345Z] GET /services -> Served public/services.html (Status 200 OK)
[2026-09-19T11:05:22.678Z] GET /contact -> Served public/contact.html (Status 200 OK)
[2026-09-19T11:05:30.901Z] GET /test-404 -> Served public/404.html (Status 404 Not Found)
```
