import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import { createAccount, login } from "@/controllers/authController";

const router = Router();

router.post("/create-account", asyncHandler(createAccount));
router.post("/login", asyncHandler(login));

export default router;
