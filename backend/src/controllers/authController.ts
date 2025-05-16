import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/utils/jwt";
import { createAccountSchema, loginSchema } from "@/validators/authSchema";
import { sendWelcomeEmail } from "@/utils/emailService";

const prisma = new PrismaClient();

// POST:
const createAccount = async (
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
      message: "You already have a GratiFi account. Please log in to continue.",
    });

    return;
  }

  const user = await prisma.user.create({
    data: { name, email, picture, user_type },
  });

  const app_token = generateToken(user);

  res.status(201).json({
    message: "🎉 Welcome to GratiFi — where rewards meet impact!",
    app_token,
    data: user,
  });

  await sendWelcomeEmail(email, name);

  return;
};

// POST:
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "GratiFi said nah. Refresh and re-run it.",
      errors: parsed.error.flatten().fieldErrors,
    });

    return;
  }

  const { name, email } = parsed.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const app_token = generateToken({
      name,
      email,
    });

    res.status(202).json({
      message: "Just one thing before the magic — your profile ✨",
      app_token,
      data: parsed.data,
    });

    return;
  }

  const app_token = generateToken({ name: user.name, email: user.email });

  res.status(200).json({
    message: `Welcome back, ${user.name}! Let’s get it.`,
    app_token,
    data: user,
  });

  return;
};

export { createAccount, login };
