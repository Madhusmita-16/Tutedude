/**
 * Assignment 8: Task Routes Dispatcher
 * 
 * Maps HTTP REST methods and endpoint paths to Task Controller handlers.
 */

const taskController = require('../controllers/taskController');

function handleTaskRoutes(req, res, pathname, method) {
    // 1. GET /api/tasks/search?q=keyword
    if (method === 'GET' && pathname === '/api/tasks/search') {
        return taskController.searchTasks(req, res);
    }

    // 2. DELETE /api/tasks/completed (Bulk delete)
    if (method === 'DELETE' && pathname === '/api/tasks/completed') {
        return taskController.clearCompletedTasks(req, res);
    }

    // 3. GET /api/tasks (Fetch all tasks)
    if (method === 'GET' && pathname === '/api/tasks') {
        return taskController.getTasks(req, res);
    }

    // 4. POST /api/tasks (Create task)
    if (method === 'POST' && pathname === '/api/tasks') {
        return taskController.createTask(req, res);
    }

    // 5. GET /api/tasks/:id (Single task)
    if (method === 'GET' && pathname.startsWith('/api/tasks/')) {
        req.params = { id: pathname.replace('/api/tasks/', '') };
        return taskController.getTaskById(req, res);
    }

    // 6. PATCH /api/tasks/:id (Partial update / status toggle)
    if (method === 'PATCH' && pathname.startsWith('/api/tasks/')) {
        req.params = { id: pathname.replace('/api/tasks/', '') };
        return taskController.patchTask(req, res);
    }

    // 7. PUT /api/tasks/:id (Full replace)
    if (method === 'PUT' && pathname.startsWith('/api/tasks/')) {
        req.params = { id: pathname.replace('/api/tasks/', '') };
        return taskController.updateTask(req, res);
    }

    // 8. DELETE /api/tasks/:id (Delete single task)
    if (method === 'DELETE' && pathname.startsWith('/api/tasks/')) {
        req.params = { id: pathname.replace('/api/tasks/', '') };
        return taskController.deleteTask(req, res);
    }

    return false;
}

module.exports = handleTaskRoutes;
