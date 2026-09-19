/**
 * VISITRA - Visitor Service Layer
 */

const Visitor = require('../models/Visitor');
const Appointment = require('../models/Appointment');
const Pass = require('../models/Pass');
const AuditLog = require('../models/AuditLog');
const mongoose = require('mongoose');

let activeVisitorsStore = [
    {
        _id: 'vis-101',
        name: 'Alexander Wright',
        email: 'alex.wright@techcorp.com',
        phone: '+1 555-0192',
        company: 'TechCorp Systems',
        governmentId: 'PASS-98214',
        status: 'CHECKED_IN'
    },
    {
        _id: 'vis-102',
        name: 'Elena Rostova',
        email: 'elena.r@innovate.org',
        phone: '+1 555-0184',
        company: 'Innovate Labs',
        governmentId: 'PASS-44120',
        status: 'REGISTERED'
    }
];

class VisitorService {
    async getAllVisitors(search) {
        if (mongoose.connection.readyState === 1) {
            const query = {};
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { company: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ];
            }
            return await Visitor.find(query).sort({ createdAt: -1 });
        } else {
            let res = [...activeVisitorsStore];
            if (search) {
                const s = search.toLowerCase();
                res = res.filter(v => v.name.toLowerCase().includes(s) || v.company.toLowerCase().includes(s));
            }
            return res;
        }
    }

    async registerVisitor(data) {
        if (mongoose.connection.readyState === 1) {
            let visitor = await Visitor.findOne({ email: data.email });
            if (!visitor) {
                visitor = await Visitor.create({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    company: data.company || 'Independent',
                    governmentId: data.governmentId || 'GOV-88219'
                });
            }

            const appointment = await Appointment.create({
                visitorId: visitor._id,
                visitorName: visitor.name,
                visitorEmail: visitor.email,
                hostName: data.hostName || 'Sarah Connor (Host)',
                purpose: data.purpose || 'Business Meeting',
                scheduledDate: new Date().toISOString().split('T')[0],
                scheduledTime: '10:00 AM',
                status: 'APPROVED'
            });

            const passNumber = 'VP-2026-' + Math.floor(10000 + Math.random() * 90000);
            const pass = await Pass.create({
                visitorId: visitor._id,
                appointmentId: appointment._id,
                passNumber,
                qrToken: `VISITRA_PASS_${passNumber}_SECURE`,
                visitorName: visitor.name,
                hostName: appointment.hostName,
                purpose: appointment.purpose,
                validFrom: '09:00 AM',
                validUntil: '06:00 PM',
                status: 'ACTIVE'
            });

            await AuditLog.create({
                userEmail: visitor.email,
                role: 'VISITOR',
                action: 'VISITOR_PRE_REGISTERED',
                entity: 'Pass',
                details: `Pass ${passNumber} generated for ${visitor.name}`
            });

            return { visitor, appointment, pass };
        } else {
            const passNumber = 'VP-2026-' + Math.floor(10000 + Math.random() * 90000);
            const newVis = {
                _id: 'vis-' + Date.now(),
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company || 'Independent',
                governmentId: 'GOV-' + Math.floor(10000 + Math.random() * 90000),
                status: 'REGISTERED'
            };
            activeVisitorsStore.unshift(newVis);

            const pass = {
                passNumber,
                qrToken: `VISITRA_PASS_${passNumber}_SECURE`,
                visitorName: data.name,
                hostName: data.hostName || 'Sarah Connor (Host)',
                purpose: data.purpose || 'Business Meeting',
                validFrom: '09:00 AM',
                validUntil: '06:00 PM',
                status: 'ACTIVE'
            };

            const appointment = {
                visitorName: data.name,
                visitorEmail: data.email,
                hostName: pass.hostName,
                purpose: pass.purpose,
                scheduledDate: new Date().toISOString().split('T')[0],
                status: 'APPROVED'
            };

            return { visitor: newVis, appointment, pass };
        }
    }
}

module.exports = new VisitorService();
