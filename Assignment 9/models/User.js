/**
 * VISITRA - User Schema Model
 * Roles: ADMIN, SECURITY, EMPLOYEE, VISITOR
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        phone: { type: String, default: '', trim: true },
        password: { type: String, required: true },
        role: { 
            type: String, 
            enum: ['ADMIN', 'SECURITY', 'EMPLOYEE', 'VISITOR'], 
            default: 'VISITOR' 
        },
        department: { type: String, default: 'General' },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
