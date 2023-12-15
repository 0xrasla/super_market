import { Router } from "express";
import { WarehouseController } from "../controllers/Warehouse.controller.js";
import { body, query } from "express-validator";

export const WarehouseRouter = Router()
  .post(
    "/add",
    body("name").isString(),
    body("location").isString(),
    body("managername").isString(),
    body("mobilenumber").isString(),
    body("city").isString(),
    body("address").isString(),
    WarehouseController.createWarehouse
  )
  .get("/", query("id").isMongoId(), WarehouseController.getWarehouse)
  .get("/all", WarehouseController.getWarehouses)
  .patch("/", body("name").isString(), WarehouseController.updateWarehouse)
  .delete("/", query("id").isMongoId(), WarehouseController.deleteWarehouse)
  .post("/generatereports", WarehouseController.generateReports)
  .get("/getreports",query("id"), WarehouseController.getReports);

