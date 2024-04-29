import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: String,
  userDeniedSquare: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  salt: String,
  avatar: String,
  hasIntegrated: { type: Boolean, default: false },
  hasRooms: { type: Boolean, default: false },
  hasRecorded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  metaData: { type: Schema.Types.ObjectId, ref: "MetaData" },
  squareData: { type: Schema.Types.ObjectId, ref: "SquareData" },
});

const squareDataSchema = new Schema({
  tokens: String,
  expiresAt: String,
  merchantId: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const metaDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  iv: String,
  scopes: String,
  squareTokenLastUpdated: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const SquareData =
  mongoose.models.SquareData || mongoose.model("SquareData", squareDataSchema);
export const MetaData =
  mongoose.models.MetaData || mongoose.model("MetaData", metaDataSchema);
