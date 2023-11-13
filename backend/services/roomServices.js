const Room = require('../models/room');
const Booking = require('../models/booking');

/**
 * @function searchRooms
 * @async
 * @description Retrieve a list of all rooms from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves with a JSON response containing a list of rooms.
 */
const searchRooms = async (req, res, next) => {
    try {
        // Retrieve a list of all rooms from the database
        const rooms = await Room.find();

        // Respond with a JSON array of rooms
        res.json(rooms);
    } catch (error) {
        // Handle any internal server errors and provide an error response
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

/**
 * @function getById
 * @async
 * @description Retrieve a room by its ID from the database.
 * @param {Object} req - Express request object with a room ID parameter.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves with a JSON response containing the room with the specified ID.
 */
const getById = async (req, res, next) => {
    try {
        // Find a room in the database based on the provided room ID
        const rooms = await Room.findOne({ _id: req.params.id });

        // Respond with a JSON object representing the found room
        res.json(rooms);
    } catch (error) {
        // Handle any internal server errors and provide an error response
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

/**
 * @function searchAvailableRooms
 * @async
 * @description Find available rooms based on date and capacity criteria.
 * @param {Object} req - Express request object with date and capacity parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves with a JSON response containing available rooms and their time slots.
 */
const searchAvailableRooms = async (req, res, next) => {
    try {
        // Validate the date parameter format using a regular expression
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(req.params.date)) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        // Validate the capacity parameter
        const capacity = parseInt(req.params.capacity);
        if (isNaN(capacity) || capacity <= 0) {
            return res.status(400).json({ error: 'Invalid capacity. Must be a positive integer.' });
        }

        // Retrieve all rooms with a capacity greater than or equal to the specified capacity
        const rooms = await Room.find({ capacity: { $gte: req.params.capacity } });

        // Define the date range for the specified day
        const day = new Date(req.params.date);
        day.toLocaleString('en-US', { timeZone: 'Europe/Brussels' });
        day.setHours(0, 0, 0, 0);
        const nextDay = new Date(day);
        nextDay.setDate(nextDay.getDate() + 1);

        // Define the time slot duration in minutes
        const timeSlotDuration = 30;

        // Fetch available time slots for each room
        await Promise.all(rooms.map(async (room) => {
            // Retrieve bookings for the room within the specified date range
            const bookings = await Booking.find({
                room: room._id,
                start_date: {
                    $gte: day,
                    $lt: nextDay
                }
            }).select('start_date end_date');

            // Calculate occupied time slots
            var occuppiedTimeSlots = [];

            bookings.forEach(booking => {
                var start_date = new Date(booking.start_date);
                var end_date = new Date(booking.end_date);

                var occupiedTimeSlot = new Date(start_date);
                do {
                    occuppiedTimeSlots.push(new Date(occupiedTimeSlot).toISOString());
                    occupiedTimeSlot.setMinutes(occupiedTimeSlot.getMinutes() + timeSlotDuration);
                }
                while (occupiedTimeSlot < end_date)
            })

            // Calculate available time slots
            var availableTimeSlots = [];
            var availableTimeSlot = new Date(day);
            do {
                if (occuppiedTimeSlots.indexOf(availableTimeSlot.toISOString()) == -1) {
                    availableTimeSlots.push(new Date(availableTimeSlot).toISOString())
                }

                availableTimeSlot.setMinutes(availableTimeSlot.getMinutes() + timeSlotDuration);
            }
            while (availableTimeSlot < nextDay)

            // Attach available time slots to the room object
            room.bookings = availableTimeSlots;
        }));

        // Respond with a JSON object containing the time slot duration and available rooms
        res.status(200).json({
            timeslot_duration: timeSlotDuration,
            rooms: rooms
        });
    } catch (error) {
        // Handle any internal server errors
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

/**
 * Exports the functions for handling room-related routes.
 */
module.exports = {
    searchRooms,
    getById,
    searchAvailableRooms
}