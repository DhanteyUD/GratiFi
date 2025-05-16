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
exports.login = exports.createAccount = void 0;
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
const authSchema_1 = require("../validators/authSchema");
const emailService_1 = require("../utils/emailService");
const prisma = new client_1.PrismaClient();
// POST:
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = authSchema_1.createAccountSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            message: "Validation error",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const { name, email, picture, user_type } = parsed.data;
    const existingUser = yield prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        res.status(409).json({
            message: "You already have a GratiFi account. Please log in to continue.",
        });
        return;
    }
    const user = yield prisma.user.create({
        data: { name, email, picture, user_type },
    });
    const app_token = (0, jwt_1.generateToken)(user);
    res.status(201).json({
        message: "🎉 Welcome to GratiFi — where rewards meet impact!",
        app_token,
        data: user,
    });
    yield (0, emailService_1.sendWelcomeEmail)(email, name);
    return;
});
exports.createAccount = createAccount;
// POST:
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = authSchema_1.loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            message: "GratiFi said nah. Refresh and re-run it.",
            errors: parsed.error.flatten().fieldErrors,
        });
        return;
    }
    const { name, email } = parsed.data;
    const user = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        const app_token = (0, jwt_1.generateToken)({
            name,
            email,
        });
        res.status(202).json({
            message: "Just one thing before the magic — your profile ✨",
            app_token,
            data: parsed.data,
        });
        return;
    }
    const app_token = (0, jwt_1.generateToken)({ name: user.name, email: user.email });
    res.status(200).json({
        message: `Welcome back, ${user.name}! Let’s get it.`,
        app_token,
        data: user,
    });
    return;
});
exports.login = login;
