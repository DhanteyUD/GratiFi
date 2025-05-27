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
import { getUserProfile, getAllUsers, getUserByEmail } from "@/controllers/userController";

const router = Router();

router.get("/profile", authenticate, asyncHandler(getUserProfile));
router.get("/users", authenticate, asyncHandler(getAllUsers));
router.get("/:email", authenticate, asyncHandler(getUserByEmail));

export default router;
