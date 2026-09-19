/**
 * Assignment 7: Identifying and Implementing RESTful APIs for To-Do List App
 * 
 * Objective: Build a complete reference Node.js HTTP Web Server serving the REST API
 * endpoints for a To-Do List application.
 * 
 * Implemented REST Endpoints:
 * - GET    /api/tasks          -> Retrieve all tasks (supports query filtering ?status=active|completed)
 * - GET    /api/tasks/:id      -> Retrieve single task by ID
 * - POST   /api/tasks          -> Create new task (Generates unique ID)
 * - PUT    /api/tasks/:id      -> Replace task details
 * - PATCH  /api/tasks/:id      -> Partially update task (e.g. toggle completion)
 * - DELETE /api/tasks/:id      -> Delete specific task by ID
 * - DELETE /api/tasks/completed -> Delete all completed tasks
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// In-Memory Data Store initialized with sample tasks
let tasks = [
    {
        id: "task-101",
        title: "Complete Node.js Assignment 7",
        description: "Outline REST API endpoints and document specifications.",
        priority: "high",
        completed: true,
        dueDate: "2026-09-20T23:59:59.000Z",
        createdAt: new Date().toISOString()
    },
    {
        id: "task-102",
        title: "Review React Custom Hooks in Assignment 5",
        description: "Practice data fetching with useFetch custom hook.",
        priority: "medium",
        completed: false,
        dueDate: "2026-09-22T18:00:00.000Z",
        createdAt: new Date().toISOString()
    },
    {
        id: "task-103",
        title: "Prepare for upcoming web dev project submission",
        description: "Test all API endpoints and verify responsiveness.",
        priority: "high",
        completed: false,
        dueDate: "2026-09-25T12:00:00.000Z",
        createdAt: new Date().toISOString()
    }
];

// MIME Types map
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
};

// Helper: Parse JSON request body
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(new Error('Invalid JSON body'));
            }
        });
        req.on('error', err => reject(err));
    });
}

// Helper: Send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

// Helper: Unique ID generator
function generateUniqueId() {
    return 'task-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
}

// Create Server Instance
const server = http.createServer(async (req, res) => {
    // Handle CORS Preflight Options
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

    // --- REST API ENDPOINTS ---

    // 1. DELETE /api/tasks/completed (Bulk delete completed)
    if (method === 'DELETE' && pathname === '/api/tasks/completed') {
        const initialCount = tasks.length;
        tasks = tasks.filter(t => !t.completed);
        const deletedCount = initialCount - tasks.length;
        return sendJSON(res, 200, {
            success: true,
            message: `Deleted ${deletedCount} completed task(s)`,
            deletedCount
        });
    }

    // 2. GET /api/tasks (Fetch all tasks with filtering)
    if (method === 'GET' && pathname === '/api/tasks') {
        let result = [...tasks];
        if (parsedUrl.query.status === 'completed') {
            result = result.filter(t => t.completed);
        } else if (parsedUrl.query.status === 'active') {
            result = result.filter(t => !t.completed);
        }

        if (parsedUrl.query.priority) {
            result = result.filter(t => t.priority === parsedUrl.query.priority);
        }

        return sendJSON(res, 200, {
            success: true,
            count: result.length,
            data: result
        });
    }

    // 3. GET /api/tasks/:id (Fetch single task)
    if (method === 'GET' && pathname.startsWith('/api/tasks/')) {
        const id = pathname.replace('/api/tasks/', '');
        const task = tasks.find(t => t.id === id);
        if (!task) {
            return sendJSON(res, 404, { success: false, error: `Task with ID '${id}' not found` });
        }
        return sendJSON(res, 200, { success: true, data: task });
    }

    // 4. POST /api/tasks (Create new task)
    if (method === 'POST' && pathname === '/api/tasks') {
        try {
            const body = await parseRequestBody(req);
            if (!body.title || body.title.trim() === '') {
                return sendJSON(res, 400, { success: false, error: 'Task title is required' });
            }

            const newTask = {
                id: generateUniqueId(),
                title: body.title.trim(),
                description: body.description ? body.description.trim() : '',
                priority: body.priority || 'medium',
                completed: false,
                dueDate: body.dueDate || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            tasks.unshift(newTask);
            return sendJSON(res, 201, {
                success: true,
                message: 'Task created successfully',
                data: newTask
            });
        } catch (err) {
            return sendJSON(res, 400, { success: false, error: 'Malformed JSON payload' });
        }
    }

    // 5. PATCH /api/tasks/:id (Partial update / toggle status)
    if (method === 'PATCH' && pathname.startsWith('/api/tasks/')) {
        const id = pathname.replace('/api/tasks/', '');
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return sendJSON(res, 404, { success: false, error: `Task with ID '${id}' not found` });
        }

        try {
            const body = await parseRequestBody(req);
            const updatedTask = {
                ...tasks[taskIndex],
                ...body,
                updatedAt: new Date().toISOString()
            };
            tasks[taskIndex] = updatedTask;
            return sendJSON(res, 200, {
                success: true,
                message: 'Task updated successfully',
                data: updatedTask
            });
        } catch (err) {
            return sendJSON(res, 400, { success: false, error: 'Malformed JSON payload' });
        }
    }

    // 6. PUT /api/tasks/:id (Full update)
    if (method === 'PUT' && pathname.startsWith('/api/tasks/')) {
        const id = pathname.replace('/api/tasks/', '');
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return sendJSON(res, 404, { success: false, error: `Task with ID '${id}' not found` });
        }

        try {
            const body = await parseRequestBody(req);
            if (!body.title) {
                return sendJSON(res, 400, { success: false, error: 'Task title is required for full update' });
            }

            const updatedTask = {
                id,
                title: body.title,
                description: body.description || '',
                priority: body.priority || 'medium',
                completed: body.completed || false,
                dueDate: body.dueDate || null,
                createdAt: tasks[taskIndex].createdAt,
                updatedAt: new Date().toISOString()
            };

            tasks[taskIndex] = updatedTask;
            return sendJSON(res, 200, {
                success: true,
                message: 'Task replaced successfully',
                data: updatedTask
            });
        } catch (err) {
            return sendJSON(res, 400, { success: false, error: 'Malformed JSON payload' });
        }
    }

    // 7. DELETE /api/tasks/:id (Delete single task)
    if (method === 'DELETE' && pathname.startsWith('/api/tasks/')) {
        const id = pathname.replace('/api/tasks/', '');
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return sendJSON(res, 404, { success: false, error: `Task with ID '${id}' not found` });
        }

        const deleted = tasks.splice(taskIndex, 1)[0];
        return sendJSON(res, 200, {
            success: true,
            message: `Task '${deleted.title}' deleted successfully`,
            deletedId: id
        });
    }

    // --- STATIC FILES SERVING ---
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested endpoint or asset was not found.</p>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 7 REST API Server running at http://localhost:${PORT}`);
    console.log(`📌 Interactive REST API Endpoints:`);
    console.log(`   - GET    http://localhost:${PORT}/api/tasks`);
    console.log(`   - POST   http://localhost:${PORT}/api/tasks`);
    console.log(`   - PATCH  http://localhost:${PORT}/api/tasks/:id`);
    console.log(`   - DELETE http://localhost:${PORT}/api/tasks/:id`);
    console.log(`====================================================`);
});
