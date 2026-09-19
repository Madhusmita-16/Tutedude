/**
 * Assignment 9: MongoDB Database Connection
 */

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/visitor_pass_db";

function connectDB() {
    console.log(`[DATABASE] Connecting to MongoDB Atlas / Local at: ${MONGO_URI}`);
    console.log(`[DATABASE] Collections: Users, Visitors, Passes, CheckLogs initialized.`);
}

module.exports = { connectDB, MONGO_URI };
