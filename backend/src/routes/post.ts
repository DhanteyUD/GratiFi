import { Router } from "express";
import { asyncHandler } from "@/middleware/asyncHandler";
import { createPost, getPosts } from "@/controllers/postController";

const router = Router();

router.post("/create-post", asyncHandler(createPost));
router.get("/posts", asyncHandler(getPosts));

export default router;
