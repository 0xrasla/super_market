import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  lotNumber: {
    type: String,
    required: true,
  },
  rackNumber: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  expirydate: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  gstnumber: {
    type: String,
    required: true,
  },
});

export default model("Product", ProductSchema);
