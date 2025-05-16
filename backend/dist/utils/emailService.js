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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const react_1 = __importDefault(require("react"));
const resend_1 = require("resend");
const config_1 = require("../config");
const render_1 = require("@react-email/render");
const WelcomeEmail_1 = require("../emails/WelcomeEmail");
const resend = new resend_1.Resend(config_1.configKeys.resendApiKey);
const sendWelcomeEmail = (to, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const html = yield (0, render_1.render)(react_1.default.createElement(WelcomeEmail_1.WelcomeEmail, { userName }));
    const { data, error } = yield resend.emails.send({
        from: "GratiFi <noreply@gratifi.com>",
        to,
        subject: "Welcome to GratiFi 🎉",
        html,
    });
    if (error) {
        console.error("Email send error:", error);
    }
    return data;
});
exports.sendWelcomeEmail = sendWelcomeEmail;
