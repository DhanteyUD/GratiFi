"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err.message || err.stack || err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
