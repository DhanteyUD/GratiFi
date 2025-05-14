declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import { Router } from "express";
import { authenticate } from "@/middleware/auth";
import { asyncHandler } from "@/middleware/asyncHandler";
import { getUserProfile } from "@/controllers/userController";

const router = Router();

router.get("/profile", authenticate, asyncHandler(getUserProfile));

export default router;
