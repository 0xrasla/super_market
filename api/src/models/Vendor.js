import { Schema, model } from "mongoose";

const VendorSchema = new Schema({
  gstnumber: { type: String, required: true },
  businessname: { type: String },
  vendorname: { type: String },
  mobilenumber: { type: String },
  email: { type: String },
  location: { type: String },
  city: { type: String },
  address: { type: String },
  accountnumber: { type: String },
  ifsc: { type: String },
  aadharupload: { type: String },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Vendor", VendorSchema);
