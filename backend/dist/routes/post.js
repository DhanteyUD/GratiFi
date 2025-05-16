"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middleware/asyncHandler");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router.post("/create-post", (0, asyncHandler_1.asyncHandler)(postController_1.createPost));
router.get("/posts", (0, asyncHandler_1.asyncHandler)(postController_1.getPosts));
exports.default = router;
