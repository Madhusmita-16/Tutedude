/**
 * VISITRA - Visitor Schema Model
 */

const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, required: true, trim: true },
        company: { type: String, default: 'Independent', trim: true },
        governmentId: { type: String, default: '', trim: true },
        photo: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
        status: { type: String, enum: ['REGISTERED', 'CHECKED_IN', 'CHECKED_OUT', 'BLACK_LISTED'], default: 'REGISTERED' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Visitor', VisitorSchema);
