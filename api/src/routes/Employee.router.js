import { Router } from "express";
import { EmployeeController } from "../controllers/Employee.controller.js";
import { body, query } from "express-validator";

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
    body("accountnumber").isString(),
   
    EmployeeController.createEmployee
  )
  .get("/", query("id").isMongoId(), EmployeeController.getEmployee)
  .get("/all", EmployeeController.getEmployees)
  .patch("/", body("name").isString(), EmployeeController.updateEmployee)
  .delete("/", query("id").isMongoId(), EmployeeController.deleteEmployee);
