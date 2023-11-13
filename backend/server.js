// Load environment variables from a .env file if present
require('dotenv').config();

// Import required libraries and modules
const cors = require('cors');
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const roomRouter = require('./routes/roomRouter');
const bookingRouter = require('./routes/bookingRouter');
const { connectToDatabase, setupDatabaseConnectionHandlers } = require('./db');

// Set up security headers using the Helmet middleware
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define routes for rooms and bookings under the '/api' path
app.use('/api', roomRouter);
app.use('/api', bookingRouter);

// Define the port to listen on, using environment variable PORT or default to 3000
const port = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});

// Connect to the database
connectToDatabase();

// Set up database connection handlers
setupDatabaseConnectionHandlers();

// Handle process termination signals (e.g., Ctrl+C)
process.on('SIGINT', async () => {
    console.log('Server is shutting down...');

    try {
        // Close the MongoDB connection
        await mongoose.disconnect();
        console.log('Database connection closed.');
        process.exit(0); // Exit the process with success status
    } catch (error) {
        console.error('Error closing database connection:', error);
        process.exit(1); // Exit the process with an error status
    }
});
