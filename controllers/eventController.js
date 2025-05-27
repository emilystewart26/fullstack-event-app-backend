const Event = require("../Models/Event");
const User = require("../Models/User");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addEvent = async (req, res) => {
  console.log("addEvent");
  console.log(req.headers);
  console.log(req.body);

  const userToken = req.headers.authorization.split(" ")[1];

  console.log(userToken);

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInDB = await User.findOne({ token: userToken });

  console.log(userInDB);

  if (!userInDB) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const event = new Event ({
    name: req.body.name,
    location: req.body.location,
    details: req.body.details,
    when: req.body.when,
    userId: userInDB._id,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
    try {
    const event = await Event.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      });
      if (!event){
        return response.status(404).send({error: "Event not found"})
    }
    response.send(event);
  } catch (error) {
    response.status(500).send({ error: "Failed to update Event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



