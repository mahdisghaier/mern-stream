const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController');

// Define routes for rooms
router.get('/', roomController.index);            // Get all rooms
router.get('/:id', roomController.show);          // Get a single room by id
router.post('/', roomController.create);          // Create a new room
router.put('/:id', roomController.update);        // Update a room by id
router.delete('/:id', roomController.destroy);    // Delete a room by id

module.exports = router;
