import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message || err.stack || err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};
