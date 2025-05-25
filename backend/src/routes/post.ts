import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import {
  createPost,
  getPosts,
  getMyPosts,
  getPostsByUserId,
} from "@/controllers/postController";
import { authenticate } from "@/middleware/auth";

const router = Router();

router.post("/create-post", authenticate, asyncHandler(createPost));
router.get("/posts", authenticate, asyncHandler(getPosts));
router.get("/posts/me", authenticate, asyncHandler(getMyPosts));
router.get("/posts/user/:userId", authenticate, asyncHandler(getPostsByUserId));

export default router;
