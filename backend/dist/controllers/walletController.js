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
exports.checkOrInsertWallet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkOrInsertWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey, email } = req.body;
    if (!publicKey || !email) {
        return res.status(400).json({ error: "publicKey and email required" });
    }
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const existingWallet = yield prisma.wallet.findUnique({
        where: { publicKey },
    });
    if (existingWallet) {
        return res
            .status(200)
            .json({ message: "Wallet already exists", wallet: existingWallet });
    }
    const newWallet = yield prisma.wallet.create({
        data: {
            publicKey,
            userId: user.id,
        },
    });
    res.status(201).json({ message: "Wallet added", newWallet });
});
exports.checkOrInsertWallet = checkOrInsertWallet;
