import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import { checkOrInsertWallet } from "@/controllers/walletController";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.post("/create-wallet", authenticate, asyncHandler(checkOrInsertWallet));

export default router;
