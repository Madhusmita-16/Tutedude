/**
 * Assignment 8: MongoDB Connection Configuration using Mongoose ODM
 * 
 * Configures active connection to MongoDB instance using Mongoose ODM.
 */

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tutedude_todo_db";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 3000
        });
        console.log(`[DATABASE] MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (err) {
        console.log(`[DATABASE] MongoDB Connection Status: Offline / Connecting (${err.message})`);
        console.log(`[DATABASE] URI Configured: ${MONGO_URI}`);
    }
};

module.exports = connectDB;
