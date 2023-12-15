import { Schema, model } from "mongoose";

const WarehouseSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  managername: { type: String },
  mobilenumber: { type: String },
  city: { type: String },
  address: { type: String },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Warehouse", WarehouseSchema);
