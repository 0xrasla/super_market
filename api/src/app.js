import express from "express";
import { createServer } from "http";

// import middlewares
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { config } from "dotenv";

config();
// db
import { connectDB } from "./config/db.js";
// routes
import BaseRouter from "./routes/index.js";

const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(helmet());

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.use("/api", BaseRouter);

const httpServer = createServer(app);

connectDB();

export default httpServer;
