/**
 * VISITRA - Database Connection Configuration (Mongoose ODM)
 */

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/visitra_db";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 3000
        });
        console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`[DATABASE] MongoDB Connection Status: Offline / Local Memory Storage Active (${err.message})`);
        console.log(`[DATABASE] Target URI: ${MONGO_URI}`);
    }
};

module.exports = connectDB;
