"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
const config_1 = require("../config");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    // Handle custom AppError:
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // Handle Zod validation error:
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = err.errors.map((e) => e.message).join(", ");
    }
    // Handle Prisma known errors (e.g., unique constraint violation):
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            message = "A user with this field already exists.";
        }
    }
    // Log error in development:
    if (config_1.configKeys.env !== "production") {
        console.error("Error:", err);
    }
    res.status(statusCode).json({ error: message });
    return;
};
exports.errorHandler = errorHandler;
