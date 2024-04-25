import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema({
  userId: { type: String },
  roomId: { type: String },
  fileName: { type: String, unique: true },
  startTime: { type: String },
  endTime: { type: String },
  url: { type: String },
  thumbnail: { type: String }
});

const Recording = mongoose.models.Recording || mongoose.model("Recording", recordingSchema);

export default Recording;
