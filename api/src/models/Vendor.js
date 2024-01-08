import { Schema, model } from "mongoose";

const BankDetailsSchema = new Schema({
  accountnumber: { type: String },
  ifsc: { type: String },
});

const KYCDetailsSchema = new Schema({
  aadharupload: { type: String },
});

const VendorSchema = new Schema({
  gstnumber: { type: String, required: true },
  businessname: { type: String },
  vendorname: { type: String },
  mobilenumber: { type: String },
  email: { type: String },
  location: { type: String },
  city: { type: String },
  address: { type: String },
  bankdetails: { type: BankDetailsSchema }, 
  kyc: { type: KYCDetailsSchema },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Vendor", VendorSchema);
