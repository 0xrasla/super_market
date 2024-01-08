import { Router } from "express";
import { VendorController } from "../controllers/Vendor.controller.js";
import { body, query } from "express-validator";
import { upload } from "../middlewares/upload.js";

export const VendorRouter = Router()
  .post(
    "/add",
    body("gstnumber").isString(),
    body("businessname").isString(),
    body("vendorname").isString(),
    body("mobilenumber").isString(),
    body("email").isEmail(),
    body("location").isString(),
    body("city").isString(),
    body("address").isString(),
    body("bankdetails.accountnumber").isString(),
    body("bankdetails.ifsc").isString(),
    body("kyc.aadharupload").isString(),
    upload.single("aadharupload"),
    VendorController.createVendor
  )
  .get("/", query("id").isMongoId(), VendorController.getVendor)
  .get("/all", VendorController.getVendors)
  .patch("/", body("gstnumber").isString(),  VendorController.updateVendor)
  .delete("/", query("id").isMongoId(), VendorController.deleteVendor);
