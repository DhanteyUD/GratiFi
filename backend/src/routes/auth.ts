import { Router } from "express";
import { createAccount } from "@/controllers/authController";

const router = Router();

router.post("/create-account", createAccount);

export default router;
