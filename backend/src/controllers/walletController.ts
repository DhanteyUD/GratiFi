import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const checkOrInsertWallet = async (req: Request, res: Response) => {
  const { publicKey, email } = req.body;

  if (!publicKey || !email) {
    return res.status(400).json({ error: "publicKey and email required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const existingWallet = await prisma.wallet.findUnique({
    where: { publicKey },
  });

  if (existingWallet) {
    return res
      .status(200)
      .json({ message: "Wallet already exists", wallet: existingWallet });
  }

  const newWallet = await prisma.wallet.create({
    data: {
      publicKey,
      userId: user.id,
    },
  });

  res.status(201).json({ message: "Wallet added", newWallet });
};
