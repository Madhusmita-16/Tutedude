/**
 * Assignment 8: Task Data Model / Schema Definition
 * 
 * Defines the Task object structure:
 * - id: String (Unique UUID)
 * - title: String (Required)
 * - description: String
 * - priority: Enum ['low', 'medium', 'high']
 * - completed: Boolean (Default: false)
 * - dueDate: Date
 * - createdAt: Date
 * - updatedAt: Date
 */

class TaskModel {
    constructor({ title, description = '', priority = 'medium', completed = false, dueDate = null }) {
        this.id = 'task-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
        this.title = title.trim();
        this.description = description.trim();
        this.priority = ['low', 'medium', 'high'].includes(priority) ? priority : 'medium';
        this.completed = Boolean(completed);
        this.dueDate = dueDate || null;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
}

module.exports = TaskModel;
