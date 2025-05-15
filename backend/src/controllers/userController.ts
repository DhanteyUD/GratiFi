import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET:
const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email = req.user?.email;

  if (!email) {
    res.status(400).json({ error: "Email missing from token" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });

  // implement sendProfileEmail

  return;
};

// GET:
const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const users = await prisma.user.findMany();

  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });

  return;
};

export { getUserProfile, getAllUsers };
