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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "Email is required",
    });

    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(404).json({
      message: "User not found. Please create an account.",
    });

    return;
  }

  const app_token = generateToken({ name: user.name, email: user.email });

  res.status(200).json({
    message: "Login successful!",
    app_token,
    data: user,
  });

  return;
};
