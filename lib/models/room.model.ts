import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, unique: true },
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
  createdAt: { type: Date, default: Date.now },
  metaData: { type: Schema.Types.ObjectId, ref: "MetaData" },
  squareData: { type: Schema.Types.ObjectId, ref: "SquareData" },
});

