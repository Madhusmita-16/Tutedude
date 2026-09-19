/**
 * Assignment 8: Express REST API Routes for Tasks
 * 
 * Maps HTTP requests to taskController methods.
 * Endpoint prefix: /api/tasks
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks & POST new task
router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

// GET single task, PUT update task, DELETE task
router.route('/:id')
    .get(taskController.getTaskById)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

// PATCH toggle task completed status
router.patch('/:id/toggle', taskController.toggleTaskStatus);

module.exports = router;
