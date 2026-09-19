/**
 * VISITRA - Auth Service Layer (JWT & User Management)
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'visitra_secret_key_2026';

class AuthService {
    generateToken(user) {
        return jwt.sign(
            { id: user._id || user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    async login(email, role) {
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name: email.split('@')[0].toUpperCase(),
                email,
                password: 'hashed_password_demo',
                role: role || 'ADMIN'
            });
        }
        const token = this.generateToken(user);
        return { user, token };
    }

    async getUsers() {
        return await User.find().sort({ createdAt: -1 });
    }
}

module.exports = new AuthService();
