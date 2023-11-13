/**
 * @module BookingRouter
 * @description Defines the Express router for handling booking-related routes.
 */

const express = require('express');
const bookingServices = require('../services/bookingServices');

// Create an Express router instance for handling booking-related routes
const bookingRouter = express.Router();

// Define the routes and their corresponding service functions
bookingRouter.get('/bookings', bookingServices.searchBookings);
bookingRouter.post('/booking', bookingServices.createBooking)

// Export the bookingRouter for use in the main application
module.exports = bookingRouter;