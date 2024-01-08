import { Schema, model } from "mongoose";

const ShopSchema = new Schema({
  shopname: { type: String, required: true },
  email: { type: String },
  shopownername: { type: String },
  mobilenumber: { type: String },
  city: { type: String },
  address: { type: String },
  location: { type: String },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Shop", ShopSchema);
