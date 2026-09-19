/**
 * Assignment 8: Task Controller Module
 * 
 * Implements controller business logic for managing tasks in the To-Do List application.
 */

const TaskModel = require('../models/Task');

// In-Memory Database Store initialized with sample tasks
let tasksStore = [
    new TaskModel({
        title: "Build Node.js & Express.js Backend Architecture",
        description: "Set up controllers, services, models, routes, and MongoDB configuration.",
        priority: "high",
        completed: true,
        dueDate: "2026-09-20T23:59:59.000Z"
    }),
    new TaskModel({
        title: "Integrate React Frontend with REST APIs",
        description: "Connect React state hooks to backend CRUD endpoints via Axios/Fetch.",
        priority: "high",
        completed: false,
        dueDate: "2026-09-22T18:00:00.000Z"
    }),
    new TaskModel({
        title: "Implement Task Search & Category Filtering",
        description: "Add live keyword search query filtering across task titles and descriptions.",
        priority: "medium",
        completed: false,
        dueDate: "2026-09-25T12:00:00.000Z"
    })
];

// GET /api/tasks - Retrieve all tasks with status & priority filters
exports.getTasks = (req, res) => {
    let result = [...tasksStore];
    const { status, priority } = req.query;

    if (status === 'completed') {
        result = result.filter(t => t.completed);
    } else if (status === 'active') {
        result = result.filter(t => !t.completed);
    }

    if (priority) {
        result = result.filter(t => t.priority === priority);
    }

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
};

// GET /api/tasks/search?q=keyword - Search tasks by title or description
exports.searchTasks = (req, res) => {
    const query = (req.query.q || '').toLowerCase().trim();
    if (!query) {
        return res.status(200).json({ success: true, count: tasksStore.length, data: tasksStore });
    }

    const filtered = tasksStore.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query)
    );

    res.status(200).json({
        success: true,
        query,
        count: filtered.length,
        data: filtered
    });
};

// GET /api/tasks/:id - Fetch single task by ID
exports.getTaskById = (req, res) => {
    const task = tasksStore.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ success: false, error: `Task with ID '${req.params.id}' not found` });
    }
    res.status(200).json({ success: true, data: task });
};

// POST /api/tasks - Create new task
exports.createTask = (req, res) => {
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ success: false, error: 'Task title is required' });
    }

    const newTask = new TaskModel({ title, description, priority, dueDate });
    tasksStore.unshift(newTask);

    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTask
    });
};

// PATCH /api/tasks/:id - Partially update task (e.g. toggle completion status)
exports.patchTask = (req, res) => {
    const index = tasksStore.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: `Task with ID '${req.params.id}' not found` });
    }

    const updatedTask = {
        ...tasksStore[index],
        ...req.body,
        updatedAt: new Date().toISOString()
    };

    tasksStore[index] = updatedTask;

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask
    });
};

// PUT /api/tasks/:id - Replace task details
exports.updateTask = (req, res) => {
    const index = tasksStore.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: `Task with ID '${req.params.id}' not found` });
    }

    const { title, description, priority, completed, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, error: 'Task title is required for full update' });
    }

    const updatedTask = {
        id: req.params.id,
        title: title.trim(),
        description: description ? description.trim() : '',
        priority: priority || 'medium',
        completed: Boolean(completed),
        dueDate: dueDate || null,
        createdAt: tasksStore[index].createdAt,
        updatedAt: new Date().toISOString()
    };

    tasksStore[index] = updatedTask;

    res.status(200).json({
        success: true,
        message: 'Task replaced successfully',
        data: updatedTask
    });
};

// DELETE /api/tasks/:id - Delete single task
exports.deleteTask = (req, res) => {
    const index = tasksStore.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: `Task with ID '${req.params.id}' not found` });
    }

    const deleted = tasksStore.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: `Task '${deleted.title}' deleted successfully`,
        deletedId: req.params.id
    });
};

// DELETE /api/tasks/completed - Clear all completed tasks
exports.clearCompletedTasks = (req, res) => {
    const initialCount = tasksStore.length;
    tasksStore = tasksStore.filter(t => !t.completed);
    const deletedCount = initialCount - tasksStore.length;

    res.status(200).json({
        success: true,
        message: `Cleared ${deletedCount} completed task(s)`,
        deletedCount
    });
};
