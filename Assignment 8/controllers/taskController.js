/**
 * Assignment 8: Task Controller
 * 
 * Express HTTP Request and Response handler for To-Do List APIs.
 * Calls taskService layer to execute database operations.
 */

const taskService = require('../services/taskService');

/**
 * @desc   Get all tasks
 * @route  GET /api/tasks
 */
exports.getTasks = async (req, res) => {
    try {
        const { search, category, completed } = req.query;
        const tasks = await taskService.getAllTasks({ search, category, completed });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve tasks',
            details: err.message
        });
    }
};

/**
 * @desc   Get single task by ID
 * @route  GET /api/tasks/:id
 */
exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch task',
            details: err.message
        });
    }
};

/**
 * @desc   Create new task
 * @route  POST /api/tasks
 */
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, category, dueDate } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Task title is required'
            });
        }

        const newTask = await taskService.createTask({
            title,
            description,
            priority,
            category,
            dueDate: dueDate || null
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to create task',
            details: err.message
        });
    }
};

/**
 * @desc   Update existing task
 * @route  PUT /api/tasks/:id
 */
exports.updateTask = async (req, res) => {
    try {
        const { title, description, priority, category, completed, dueDate } = req.body;

        const updatedTask = await taskService.updateTask(req.params.id, {
            title,
            description,
            priority,
            category,
            completed,
            dueDate
        });

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found for update'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to update task',
            details: err.message
        });
    }
};

/**
 * @desc   Toggle task completion status
 * @route  PATCH /api/tasks/:id/toggle
 */
exports.toggleTaskStatus = async (req, res) => {
    try {
        const task = await taskService.toggleTaskStatus(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            message: `Task marked as ${task.completed ? 'completed' : 'pending'}`,
            data: task
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to toggle task status',
            details: err.message
        });
    }
};

/**
 * @desc   Delete task
 * @route  DELETE /api/tasks/:id
 */
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskService.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete task',
            details: err.message
        });
    }
};
