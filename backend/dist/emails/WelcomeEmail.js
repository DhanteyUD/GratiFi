"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeEmail = void 0;
const react_1 = __importDefault(require("react"));
const html_1 = require("@react-email/html");
const head_1 = require("@react-email/head");
const body_1 = require("@react-email/body");
const container_1 = require("@react-email/container");
const text_1 = require("@react-email/text");
const heading_1 = require("@react-email/heading");
const WelcomeEmail = ({ userName }) => {
    return (react_1.default.createElement(html_1.Html, null,
        react_1.default.createElement(head_1.Head, null),
        react_1.default.createElement(body_1.Body, { style: { backgroundColor: "#f3f3f3", padding: "20px" } },
            react_1.default.createElement(container_1.Container, { style: {
                    backgroundColor: "#ffffff",
                    padding: "30px",
                    borderRadius: "8px",
                } },
                react_1.default.createElement(heading_1.Heading, { style: { color: "#111827" } }, "Welcome to GratiFi \uD83C\uDF89"),
                react_1.default.createElement(text_1.Text, { style: { fontSize: "16px", color: "#333" } },
                    "Hi ",
                    userName,
                    ",",
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("br", null),
                    "Thanks for signing up to ",
                    react_1.default.createElement("strong", null, "GratiFi"),
                    "! We\u2019re glad to have you on board."),
                react_1.default.createElement(text_1.Text, { style: { fontSize: "16px", color: "#333" } }, "Let us know if you ever have any questions."),
                react_1.default.createElement(text_1.Text, { style: { fontSize: "16px", color: "#333" } },
                    "Cheers,",
                    react_1.default.createElement("br", null),
                    "The GratiFi Team")))));
};
exports.WelcomeEmail = WelcomeEmail;
