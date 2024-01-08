import { Router } from "express";
import { EmployeeController } from "../controllers/Employee.controller.js";
import { body, query } from "express-validator";
import { upload } from "../middlewares/upload.js";

export const EmployeeRouter = Router()
  .post(
    "/add",
    body("name").isString(),
    body("email").isEmail(),
    body("city").isString(),
    body("mobilenumber").isString(),
    body("location").isString(),
    body("selectshop").isString(),
    body("password").isLength({ min: 6 }).isString(),
    body("address").isString(),
    body("selectrole").isString(),
    body("bankdetailsandkyc.accountnumber").isString(),  
    body("bankdetailsandkyc.aadharupload").isString(),
    body("bankdetailsandkyc.anyproof").isString(),
    body("bankdetailsandkyc.ifsc").isString(), 
    upload.single("aadharupload"),
    upload.single("anyproof"),
    EmployeeController.createEmployee
  )
  .get("/", query("id").isMongoId(), EmployeeController.getEmployee)
  .get("/all", EmployeeController.getEmployees)
  .patch("/", body("name").isString(), EmployeeController.updateEmployee)
  .delete("/", query("id").isMongoId(), EmployeeController.deleteEmployee);
