import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import {
  createPost,
  getPosts,
  getMyPosts,
  getPostsByUserId,
} from "@/controllers/postController";

const router = Router();

router.post("/create-post", asyncHandler(createPost));
router.get("/posts", asyncHandler(getPosts));
router.get("/posts/me", asyncHandler(getMyPosts));
router.get("/posts/user/:userId", asyncHandler(getPostsByUserId));

export default router;
