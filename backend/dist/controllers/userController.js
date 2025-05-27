"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getAllUsers = exports.getUserProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET:
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        res.status(400).json({ error: "Email missing from token" });
        return;
    }
    const user = yield prisma.user.findUnique({
        where: { email },
        include: { Wallet: true },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.status(200).json({
        message: "User fetched successfully",
        user,
    });
    // implement sendProfileEmail
    return;
});
exports.getUserProfile = getUserProfile;
// GET:
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: { Wallet: true },
    });
    res.status(200).json({
        message: "Users fetched successfully",
        users,
    });
    return;
});
exports.getAllUsers = getAllUsers;
// GET:
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    if (!email) {
        res.status(400).json({ error: "Email param is required" });
        return;
    }
    const user = yield prisma.user.findUnique({
        where: { email },
        include: { Wallet: true },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user,
    });
});
exports.getUserByEmail = getUserByEmail;
