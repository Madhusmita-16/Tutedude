/**
 * Assignment 8: Task Mongoose Model
 * 
 * Defines Mongoose Schema for To-Do Task collection:
 * - title: String (Required, trimmed)
 * - description: String (Trimmed)
 * - priority: String (Enum: ['low', 'medium', 'high'])
 * - category: String (Enum: ['Work', 'Personal', 'Shopping', 'Study', 'General'])
 * - completed: Boolean (Default: false)
 * - dueDate: Date
 * - timestamps: createdAt & updatedAt
 */

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true
        },
        description: {
            type: String,
            default: '',
            trim: true
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        category: {
            type: String,
            enum: ['Work', 'Personal', 'Shopping', 'Study', 'General'],
            default: 'General'
        },
        completed: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', TaskSchema);
