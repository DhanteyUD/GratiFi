"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configKeys = void 0;
exports.configKeys = {
    port: process.env.PORT || 5001,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    resendApiKey: process.env.RESEND_API_KEY,
    cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryUrl: process.env.CLOUDINARY_URL,
    databaseUrl: process.env.DATABASE_URL,
};
