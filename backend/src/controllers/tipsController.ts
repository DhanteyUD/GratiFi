import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

interface RecordTipRequestBody {
  from: string;
  toAddress: string;
  amount: number;
  signature: string;
}

export const recordTip = async (
  req: Request<{}, {}, RecordTipRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { from, toAddress, amount, signature } = req.body;

    const creator = await prisma.creator.findUnique({
      where: {
        address: toAddress,
      },
    });

    if (!creator) {
      res.status(404).json({ error: "Creator not found" });
      return;
    }

    const tip = await prisma.tip.create({
      data: {
        from,
        amount,
        signature,
        to: {
          connect: {
            id: creator.id,
          },
        },
      },
    });

    res.json(tip);
  } catch (error) {
    next(error);
  }
};
