"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.swaggerPassword = exports.urlFront = exports.jwtSecret = exports.db = exports.port = void 0;
exports.port = process.env.PORT;
exports.db = process.env.DB_URI;
exports.jwtSecret = process.env.JWT_SECRET;
exports.urlFront = process.env.URL_FRONT;
exports.swaggerPassword = process.env.SWAGGER_PASSWORD;
var nodemailer_1 = __importDefault(require("nodemailer"));
var logger = false;
if (process.env.VITE_MODE === "development") {
    logger = true;
}
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT) || 0,
    secure: true,
    auth: {
        user: process.env.SENDMAIL,
        pass: process.env.MIALPASS,
    },
    logger: logger,
});
