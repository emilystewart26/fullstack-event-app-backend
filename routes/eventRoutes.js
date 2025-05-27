const express = require('express');
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// Get all events
router.get('/', getEvents);

// Create new event
router.post('/', addEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;