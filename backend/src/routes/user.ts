import { Router, Request, Response } from "express";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}
import { authenticate } from "@/middleware/auth";
import { NextFunction } from "express";

const router = Router();
router.get(
  "/profile",
  authenticate,
  (req: Request, res: Response, next: NextFunction): void => {
    res.json({
      user: req.user || null,
    });
    next();
  }
);

export default router;
