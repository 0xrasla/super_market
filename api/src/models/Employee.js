import { Schema, model } from "mongoose";

const BankDetailsAndKYCSchema = new Schema({
  accountnumber: { type: String },
  aadharupload: { type: String },
  anyproof: { type: String },
  ifsc: { type: String },
});

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email:{ type: String },
  city: { type: String },
  location: { type: String },
  selectshop: [{
    type: Schema.Types.ObjectId,
    ref: "Shop",
  }],
  mobilenumber: { type: String },
  password: { type: String},
  address: { type: String },
  selectrole: { type: String},
  bankdetailsandkyc: { type: BankDetailsAndKYCSchema }, 
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Employee", EmployeeSchema);
