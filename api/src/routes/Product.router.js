import { Router } from "express";
import { ProductController } from "../controllers/Product.controller.js";
import { body, query } from "express-validator";

export const ProductRouter = Router()
  .post(
    "/add",
    body("lotNumber").isString(),
    body("rackNumber").isString(),
    body("productName").isString(),
    body("category").isString(),
    body("vendor").isEmail(),
    body("name").isString(),
    body("price").isString(),
    body("discount").isString(),
    body("expirydate").isString(),
    body("quantity").isString(),
    body("gst").isString(),
    ProductController.createProduct
  )
  .get("/", query("id").isMongoId(), ProductController.getProduct)
  .get("/all", ProductController.getProducts)
  .patch("/", body("gstnumber").isString(),  ProductController.updateProduct)
  .delete("/", query("id").isMongoId(), ProductController.deleteProduct);
