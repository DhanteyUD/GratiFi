import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "@/middleware/errorMiddleware";
import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/user";
import postRoutes from "@/routes/post";
import walletRoute from "@/routes/wallet";
// import { errorHandler } from "@/middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors(), express.json());

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/post", postRoutes);
apiRouter.use("/wallet", walletRoute);

app.use("/api/v1", apiRouter);

app.use(errorMiddleware);
// app.use(errorHandler);

export default app;
