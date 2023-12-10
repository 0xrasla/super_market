import { Router } from "express";
import { CustomerController } from "../controllers/Customer.controller.js";
import { body, query } from "express-validator";

export const CustomerRouter = Router()
  .post(
    "/add",
    body("customertype").isString(),
    body("customername").isString(),
    body("email").isEmail(),
    body("mobilenumber").isString(),
    body("city").isString(),
    body("address").isString(),
    CustomerController.createCustomer
  )
  .get("/", query("id").isMongoId(), CustomerController.getCustomer)
  .get("/all", CustomerController.getCustomers)
  .patch("/", body("name").isString(), CustomerController.updateCustomer)
  .delete("/", query("id").isMongoId(), CustomerController.deleteCustomer);
