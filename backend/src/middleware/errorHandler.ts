import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "@/utils/AppError";
import { configKeys } from "@/config";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Handle custom AppError:
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Handle Zod validation error:
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Handle Prisma known errors (e.g., unique constraint violation):
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "A user with this field already exists.";
    }
  }

  // Log error in development:
  if (configKeys.env !== "production") {
    console.error("Error:", err);
  }

  res.status(statusCode).json({ error: message });
  
  return;
};
