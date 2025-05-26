"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middleware/asyncHandler");
const walletController_1 = require("../controllers/walletController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create-wallet", auth_1.authenticate, (0, asyncHandler_1.asyncHandler)(walletController_1.checkOrInsertWallet));
exports.default = router;
