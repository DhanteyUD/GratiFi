"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../middleware/asyncHandler");
const walletController_1 = require("../controllers/walletController");
const router = (0, express_1.Router)();
router.post("/create-wallet", (0, asyncHandler_1.asyncHandler)(walletController_1.checkOrInsertWallet));
exports.default = router;
