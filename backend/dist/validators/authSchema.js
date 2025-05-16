"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createAccountSchema = void 0;
const zod_1 = require("zod");
exports.createAccountSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    picture: zod_1.z.string().optional(),
    user_type: zod_1.z.string().min(1, "User type is required"),
});
exports.loginSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    picture: zod_1.z.string().optional(),
    user_type: zod_1.z.string().optional(),
});
