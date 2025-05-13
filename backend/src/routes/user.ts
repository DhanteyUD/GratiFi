import { Router } from "express";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.get("/profile", authenticate, (req, res) => {
  return res.json({
    message: "User fetched successfully",
    user: req.user,
  });
});

export default router;
