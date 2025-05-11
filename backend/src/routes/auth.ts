import { Router } from "express";
import { createAccount } from "@/controllers/authController";
import { login } from "@/controllers/authController";
import { asyncHandler } from "@/middleware/asyncHandler";

const router = Router();

router.post("/create-account", asyncHandler(createAccount));
router.post("/login", asyncHandler(login));

export default router;
