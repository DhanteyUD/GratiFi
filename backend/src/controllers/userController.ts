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
    include: { Wallet: true },
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
  const users = await prisma.user.findMany({
    include: { Wallet: true },
  });

  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });

  return;
};

// GET:
const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;

  if (!email) {
    res.status(400).json({ error: "Email param is required" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { Wallet: true },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  return res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

export { getUserProfile, getAllUsers, getUserByEmail };
