import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
});

export default mongoose.model("Registration", registrationSchema);
