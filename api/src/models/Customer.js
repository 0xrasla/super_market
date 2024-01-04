import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
 type: { type: String },
  name: { type: String },
  mobilenumber: { type: String },
  city: { type: String },
  email: { type: String },
  address: { type: String },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Customer", CustomerSchema);
