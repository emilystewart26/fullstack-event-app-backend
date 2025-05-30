const Event = require("../Models/Event")
const User = require("../Models/User")
const mongoose = require("mongoose")

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        res.json(event)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getEventsByUserId = async (req, res) => {
    try {
        console.log("Route params:", req.params);
        const userId = new mongoose.Types.ObjectId(req.params.userId)
        const events = await Event.find({ userId });
        if (!events.length) {
            return res.status(404).send({ error: "No matching events found" })
        }
        res.json(events)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

exports.getEventByName = async (req, res) => {
    try {
        const event = await Event.findOne({ name: req.params.name })
        if (!event) {
            return res.status(404).send({ error: "Event not found" })
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getEventsByLocation = async (req, res) => {
    try {
        const events = await Event.find({ location: req.params.location })
        if (!events) {
            return res.status(404).send({ error: "No matching events found" })
        }
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.addEvent = async (req, res) => {
    console.log("addEvent")
    console.log(req.headers)
    console.log(req.body)

    const userToken = req.headers.authorization.split(" ")[1]

    console.log(userToken)

    if (!userToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const userInDB = await User.findOne({ token: userToken })

    console.log(userInDB)

    if (!userInDB) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const event = new Event({
        name: req.body.name,
        location: req.body.location,
        details: req.body.details,
        datetime: req.body.datetime,
        userId: userInDB._id,
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!event) {
            return res.status(404).send({ error: "Event not found" })
        }
        res.send(event)
    } catch (error) {
        res.status(500).send({ error: "Failed to update Event" })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) {
            return res.status(404).json({ message: "Event not found" })
        }
        res.json({ message: "Event deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
