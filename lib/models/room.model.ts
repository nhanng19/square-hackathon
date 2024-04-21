import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  roomId: { type: String, unique: true },
  catalogId: { type: String, unique: true },
  activeUsers: { type: Number },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
