import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { configKeys } from "@/config";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, configKeys.jwtSecret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
