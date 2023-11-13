const Booking = require('../models/booking');

/**
 * @function searchBookings
 * @async
 * @description Retrieve a list of all bookings from the database, including room details.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves with a JSON response containing a list of bookings with room information.
 */
const searchBookings = async (req, res, next) => {
    try {
        // Retrieve a list of all bookings and populate the 'room' field to include room details
        await Booking.find()
            .populate('room')
            .exec()
            .then(docs => {
                // Respond with a JSON object containing the count and details of the bookings
                res.status(200).json({
                    count: docs.length,
                    bookings: docs.map(doc => {
                        return {
                            _id: doc._id,
                            room: doc.room,
                            start_date: doc.start_date,
                            end_date: doc.end_date
                        }
                    })
                })
            });
    } catch (error) {
        // Handle any internal server errors and provide an error response
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

/**
 * @function createBooking
 * @async
 * @description Create a new booking and save it to the database.
 * @param {Object} req - Express request object with booking data in the request body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Resolves with a success message upon successful creation, or an error response.
 */
const createBooking = async (req, res, next) => {
    try {
        // Extract booking data from the request body
        let data = req.body;

        // Create a new Booking instance with the provided data
        var booking = new Booking(req.body);

        // Save the booking to the database
        booking.save()
            .then(item => {
                // Respond with a success message
                res.send("item saved to database");
            })
            .catch(err => {
                // Handle errors during the saving process and provide an error response
                res.status(400).send("unable to save to database");
            });
    } catch (error) {
        // Handle any internal server errors and provide an error response
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

/**
 * Exports the functions for handling booking-related routes.
 */
module.exports = {
    searchBookings,
    createBooking
}