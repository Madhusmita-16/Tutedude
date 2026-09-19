/**
 * Assignment 9: Check-In / Check-Out Audit Log Model Definition
 */

class CheckLogModel {
    constructor({ passCode, visitorName, action, scannerRole = 'Security' }) {
        this.logId = 'log-' + Date.now().toString(36);
        this.passCode = passCode;
        this.visitorName = visitorName;
        this.action = action; // 'CHECK-IN' or 'CHECK-OUT'
        this.timestamp = new Date().toISOString();
        this.scannerRole = scannerRole;
    }
}

module.exports = CheckLogModel;
