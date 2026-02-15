import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  category: String
});

export default mongoose.model("Event", eventSchema);
