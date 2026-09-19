/**
 * Assignment 9: Visitor & Pre-Registration Model Definition
 */

class VisitorModel {
    constructor({ name, email, phone, organization, hostEmployee, purpose, visitDate }) {
        this.id = 'vis-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
        this.name = name.trim();
        this.email = email.toLowerCase().trim();
        this.phone = phone.trim();
        this.organization = organization ? organization.trim() : 'Independent';
        this.hostEmployee = hostEmployee ? hostEmployee.trim() : 'Frontdesk Staff';
        this.purpose = purpose ? purpose.trim() : 'Business Meeting';
        this.status = 'Approved'; // ['Pending', 'Approved', 'Checked-In', 'Checked-Out', 'Rejected']
        this.visitDate = visitDate || new Date().toISOString().split('T')[0];
        this.createdAt = new Date().toISOString();
    }
}

module.exports = VisitorModel;
