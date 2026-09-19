/**
 * Assignment 8: Express.js & MongoDB Main Server Entry Point
 * 
 * Configures Express application, Mongoose database connection,
 * middleware, REST API routes, and serves the static React UI frontend.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load Environment Variables
dotenv.config();

// Import DB Connection & Routes
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Database
connectDB();

// Express Middleware Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static React Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

// Mount REST API Routes
app.use('/api/tasks', taskRoutes);

// Health Check API Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Assignment 8 Express Server & MongoDB API are Active',
        timestamp: new Date().toISOString()
    });
});

// Fallback Route for Single Page Application
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Assignment 8 Express Server running at http://localhost:${PORT}`);
    console.log(`📌 To-Do List APIs & React Frontend Integrated:`);
    console.log(`   - Web App UI: http://localhost:${PORT}/`);
    console.log(`   - REST APIs: http://localhost:${PORT}/api/tasks`);
    console.log(`====================================================`);
});
