import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  mobilenumber: { type: String },
  city: { type: String },
});

export default model("User", userSchema);
