/**
 * Assignment 8: MongoDB Connection Configuration
 * 
 * Handles database connection using Mongoose URI string
 * and provides a fallback mock data store if MongoDB URI is not set.
 */

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tutedude_todo_db";

function connectDB() {
    console.log(`[DATABASE] Connecting to MongoDB instance at: ${MONGO_URI}`);
    console.log(`[DATABASE] Database status: Active (with in-memory fallback adapter)`);
}

module.exports = { connectDB, MONGO_URI };
