import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email:{ type: String },
  city: { type: String },
  location: { type: String },
  selectshop: { type: String },
  mobilenumber: { type: String },
  password: { type: String},
  address: { type: String },
  selectrole: { type: String},
  accountnumber:{ type: String},
  aadharupload:{ type: String},
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default model("Employee", EmployeeSchema);
