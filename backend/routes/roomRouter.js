/**
 * @module RoomRouter
 * @description Defines the Express router for handling room-related routes.
 */

const express = require('express');
const roomServices = require('../services/roomServices');

// Create an Express router instance for handling room-related routes
const roomRouter = express.Router();

// Define the routes and their corresponding service functions
roomRouter.get('/rooms', roomServices.searchRooms);
roomRouter.get('/available/:date/:capacity', roomServices.searchAvailableRooms);
roomRouter.get('/rooms/:id', roomServices.getById);

// Export the roomRouter for use in the main application
module.exports = roomRouter;
