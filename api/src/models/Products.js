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
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

export default model("Products", ProductSchema);
