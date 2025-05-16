import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import { checkOrInsertWallet } from "@/controllers/walletController";

const router = Router();

router.post("/create-wallet", asyncHandler(checkOrInsertWallet));

export default router;
