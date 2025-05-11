import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, picture, user_type } = req.body;

    if (!name || !email || !user_type) {
      res.status(400).json({
        message: "Missing required fields",
      });

      return;
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          picture,
          user_type,
        },
      });
    }

    const app_token = generateToken(user);

    res.status(200).json({
      message: "Account created successfully!",
      app_token,
      data: user,
    });

    return;
  } catch (error) {
    console.error("Create account error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    next(error);

    return;
  }
};
