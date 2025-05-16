"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middleware/asyncHandler");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/create-account", (0, asyncHandler_1.asyncHandler)(authController_1.createAccount));
router.post("/login", (0, asyncHandler_1.asyncHandler)(authController_1.login));
exports.default = router;
