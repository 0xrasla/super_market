import { Router } from "express";
import { CategoryRouter } from "./Category.router.js";
import { UserRouter } from "./User.router.js";
import { FilesRouter } from "./FIles.router.js";

const BaseRouter = Router();

BaseRouter.use("/categories", CategoryRouter)
  .use("/user", UserRouter)
  .use("/files", FilesRouter);

export default BaseRouter;
