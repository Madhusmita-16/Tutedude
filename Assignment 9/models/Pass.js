/**
 * Assignment 9: Digital Pass & QR Badge Model Definition
 */

class PassModel {
    constructor({ visitorId, visitorName, hostEmployee, purpose, validDate }) {
        this.passCode = 'PASS-' + Math.floor(100000 + Math.random() * 900000);
        this.visitorId = visitorId;
        this.visitorName = visitorName;
        this.hostEmployee = hostEmployee;
        this.purpose = purpose;
        this.status = 'ACTIVE'; // ['ACTIVE', 'USED', 'EXPIRED']
        this.validDate = validDate || new Date().toISOString().split('T')[0];
        this.qrData = JSON.stringify({
            passCode: this.passCode,
            visitorId: this.visitorId,
            visitorName: this.visitorName,
            issuedAt: new Date().toISOString()
        });
        this.issuedAt = new Date().toISOString();
    }
}

module.exports = PassModel;
