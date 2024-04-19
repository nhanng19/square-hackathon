import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  roomId: { type: String, unique: true },
  productName: { type: String },
  productDescription: { type: String },
  price: { type: String },
  productUrl: { type: String },
  activeUsers: { type: Number },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room