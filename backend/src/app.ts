import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "@/routes/auth";
import { errorMiddleware } from "@/middleware/errorMiddleware";
// import apiRoutes from "@/routes/api";

dotenv.config();

const app = express();
app.use(cors(), express.json());

app.use("/api", authRoutes);
// app.use("/api", apiRoutes);

app.use(errorMiddleware);

export default app;
