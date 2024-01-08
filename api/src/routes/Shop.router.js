import { Router } from "express";
import { ShopController } from "../controllers/Shop.controller.js";
import { body, query } from "express-validator";

export const ShopRouter = Router()
  .post(
    "/add",
    body("name").isString(),
    body("location").isString(),
    body("ownername").isString(),
    body("mobilenumber").isString(),
    body("city").isString(),
    body("address").isString(),
    body("email").isEmail(),
    ShopController.createShop
  )
  .get("/", query("id").isMongoId(), ShopController.getShop)
  .get("/all", ShopController.getShops)
  .patch("/", body("name").isString(), ShopController.updateShop)
  .delete("/", query("id").isMongoId(), ShopController.deleteShop)
  .post("/generatepdf", ShopController.generatePdf)
