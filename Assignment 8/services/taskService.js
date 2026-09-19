/**
 * Assignment 8: Task Service Layer
 * 
 * Handles business logic and Mongoose database operations for Tasks.
 * Decouples database queries from Express HTTP Controllers.
 * Uses Mongoose ODM methods for all database operations.
 */

const Task = require('../models/Task');
const mongoose = require('mongoose');

// Runtime active cache for when database connection is pending
let runtimeStore = [];

class TaskService {
    /**
     * Fetch all tasks with optional search, category, and status filters
     */
    async getAllTasks(filters = {}) {
        if (mongoose.connection.readyState === 1) {
            const query = {};
            if (filters.search) query.title = { $regex: filters.search, $options: 'i' };
            if (filters.category && filters.category !== 'All') query.category = filters.category;
            if (filters.completed !== undefined && filters.completed !== 'all') {
                query.completed = filters.completed === 'true' || filters.completed === true;
            }
            return await Task.find(query).sort({ createdAt: -1 });
        } else {
            let result = [...runtimeStore];
            if (filters.search) {
                const s = filters.search.toLowerCase();
                result = result.filter(t => t.title.toLowerCase().includes(s));
            }
            if (filters.category && filters.category !== 'All') {
                result = result.filter(t => t.category === filters.category);
            }
            if (filters.completed !== undefined && filters.completed !== 'all') {
                const comp = filters.completed === 'true' || filters.completed === true;
                result = result.filter(t => t.completed === comp);
            }
            return result;
        }
    }

    /**
     * Fetch single task by ID
     */
    async getTaskById(taskId) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(taskId)) return null;
            return await Task.findById(taskId);
        } else {
            const idStr = String(taskId);
            return runtimeStore.find(t => String(t._id || t.id) === idStr) || null;
        }
    }

    /**
     * Create a new task in MongoDB via Mongoose ODM
     */
    async createTask(taskData) {
        if (mongoose.connection.readyState === 1) {
            return await Task.create(taskData);
        } else {
            const doc = new Task(taskData);
            const taskObj = doc.toObject();
            taskObj._id = doc._id.toString();
            runtimeStore.unshift(taskObj);
            return taskObj;
        }
    }

    /**
     * Update existing task by ID
     */
    async updateTask(taskId, updateData) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(taskId)) return null;
            return await Task.findByIdAndUpdate(
                taskId,
                { $set: updateData },
                { new: true, runValidators: true }
            );
        } else {
            const idStr = String(taskId);
            const index = runtimeStore.findIndex(t => String(t._id || t.id) === idStr);
            if (index === -1) return null;
            runtimeStore[index] = { ...runtimeStore[index], ...updateData, updatedAt: new Date() };
            return runtimeStore[index];
        }
    }

    /**
     * Delete task by ID
     */
    async deleteTask(taskId) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(taskId)) return null;
            return await Task.findByIdAndDelete(taskId);
        } else {
            const idStr = String(taskId);
            const index = runtimeStore.findIndex(t => String(t._id || t.id) === idStr);
            if (index === -1) return null;
            const deleted = runtimeStore[index];
            runtimeStore.splice(index, 1);
            return deleted;
        }
    }

    /**
     * Toggle task completed status
     */
    async toggleTaskStatus(taskId) {
        if (mongoose.connection.readyState === 1) {
            if (!mongoose.Types.ObjectId.isValid(taskId)) return null;
            const task = await Task.findById(taskId);
            if (!task) return null;
            task.completed = !task.completed;
            return await task.save();
        } else {
            const idStr = String(taskId);
            const task = runtimeStore.find(t => String(t._id || t.id) === idStr);
            if (!task) return null;
            task.completed = !task.completed;
            return task;
        }
    }
}

module.exports = new TaskService();
