/**
 * @module Room
 * @description Represents the schema for room data in the application.
 */

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    capacity: {
        required: true,
        type: Number
    },
    bookings: {

    }
})

module.exports = mongoose.model('Room', roomSchema)