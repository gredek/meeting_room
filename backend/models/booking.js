/**
 * @module Booking
 * @description Represents the schema for booking data in the application.
 */

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    start_date: {
        required: true,
        type: Date
    },
    end_date: {
        required: true,
        type: Date
    },
    email: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Booking', bookingSchema)