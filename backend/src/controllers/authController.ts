import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/utils/jwt";
import { createAccountSchema } from "@/validators/createAccountSchema";

const prisma = new PrismaClient();

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parsed = createAccountSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Validation error",
      errors: parsed.error.flatten().fieldErrors,
    });

    return;
  }

  const { name, email, picture, user_type } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    res.status(409).json({
      message: "User already exists. Please login",
    });

    return;
  }

  const user = await prisma.user.create({
    data: { name, email, picture, user_type },
  });

  const app_token = generateToken(user);

  res.status(201).json({
    message: "Account created successfully!",
    app_token,
    data: user,
  });

  return;
};
