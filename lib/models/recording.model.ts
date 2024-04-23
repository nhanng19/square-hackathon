import mongoose, { SchemaType } from "mongoose";
const { Schema } = mongoose;

const recordingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
  fileName: { type: String, unique: true },
  startTime: { type: String },
  endTime: { type: Number },
  url: { type: String },
});

const Recording =
  mongoose.models.Recording || mongoose.model("Recording", recordingSchema);

export default Recording;
