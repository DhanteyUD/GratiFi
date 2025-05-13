declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "@/middleware/auth";
import { NextFunction } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get(
  "/profile",
  authenticate,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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

      res.json({
        message: "User fetched successfully",
        user,
      });

      return;
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });

      return;
    }
  }
);

export default router;
