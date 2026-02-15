import express from "express";
import protect from "../middleware/protect.js";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/:eventId", protect, async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const existing = await Registration.findOne({
    user: req.user._id,
    event: event._id
  });

  if (existing)
    return res.status(400).json({ message: "Already registered" });

  const count = await Registration.countDocuments({ event: event._id });

  if (count >= event.capacity)
    return res.status(400).json({ message: "Event full" });

  await Registration.create({ user: req.user._id, event: event._id });

  res.json({ message: "Registered successfully" });
});

router.get("/my-events", protect, async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate("event");

  res.json(registrations);
});

export default router;
