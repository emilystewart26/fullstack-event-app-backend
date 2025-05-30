const express = require("express")
const router = express.Router()
const {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventByName,
    getEventsByLocation,
    getEventsByUserId,
    getEventById
} = require("../controllers/eventController")

// Get all events
router.get("/", getEvents)

router.get("/name/:name", getEventByName)

router.get("/location/:location", getEventsByLocation)

// Create new event
router.post("/", addEvent)

router.get("/userid/:userId", getEventsByUserId)

router.get("/:id", getEventById)

// Update event
router.put("/:id", updateEvent)

// Delete event
router.delete("/:id", deleteEvent)

module.exports = router