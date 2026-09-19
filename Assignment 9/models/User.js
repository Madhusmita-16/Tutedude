/**
 * Assignment 9: User Model Definition
 * Role Types: ['Admin', 'Security', 'Host', 'Visitor']
 */

class UserModel {
    constructor({ name, email, role = 'Visitor', department = 'General', phone = '' }) {
        this.id = 'usr-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
        this.name = name.trim();
        this.email = email.toLowerCase().trim();
        this.role = ['Admin', 'Security', 'Host', 'Visitor'].includes(role) ? role : 'Visitor';
        this.department = department;
        this.phone = phone;
        this.createdAt = new Date().toISOString();
    }
}

module.exports = UserModel;
