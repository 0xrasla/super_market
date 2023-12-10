import { Router } from "express";
import { CategoryRouter } from "./Category.router.js";
import { UserRouter } from "./User.router.js";
import { FilesRouter } from "./FIles.router.js";
import { WarehouseRouter } from "./Warehouse.router.js";
import { VendorRouter } from "./Vendor.router.js";
import { CustomerRouter } from "./Customer.router.js";
import { EmployeeRouter } from "./Employee.router.js";
import { ShopRouter } from "./Shop.router.js";
import { ProductRouter } from "./Product.router.js";


const BaseRouter = Router();

BaseRouter.use("/categories", CategoryRouter)
  .use("/user", UserRouter)
  .use("/files", FilesRouter)
  .use("/warehouse", WarehouseRouter)
  .use("/vendor", VendorRouter)
  .use("/customer", CustomerRouter)
  .use("/employee", EmployeeRouter)
  .use("/shop", ShopRouter)
  .use("/product", ProductRouter);


export default BaseRouter;
