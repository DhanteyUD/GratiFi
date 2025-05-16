"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const jwtSecret = config_1.configKeys.jwtSecret;
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        name: user.name,
        email: user.email,
    }, jwtSecret, {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
