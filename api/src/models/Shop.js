import { Schema, model } from "mongoose";

const ShopSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  ownername: { type: String },
  mobilenumber: { type: String },
  city: { type: String },
  address: { type: String },
  location: { type: String },
//   products: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//     },
//   ],
});

export default model("Shop", ShopSchema);
