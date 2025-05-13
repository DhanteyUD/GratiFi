import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/user";
import { errorMiddleware } from "@/middleware/errorMiddleware";
// import { errorHandler } from "@/middleware/errorHandler";
// import apiRoutes from "@/routes/api";

dotenv.config();

const app = express();
app.use(cors(), express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
// app.use("/api", apiRoutes);

app.use(errorMiddleware);
// app.use(errorHandler);

export default app;
