import { Schema, model } from "mongoose";

const CarehouseSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  managername: { type: String },
  mobilenumber: { type: String },
  city: { type: String },
  address: { type: String },
});

export default model("Warehouse", CarehouseSchema);
