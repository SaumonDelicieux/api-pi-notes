export const port = process.env.PORT;
export const db = process.env.DB_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const swaggerPassword = process.env.SWAGGER_PASSWORD;
export const StripePrivateKey = process.env.STRIPE_PRIVATE_KEY;
export const WebhooksKey = process.env.STRIPE_WH_KEY;
export const WebhooksKeyLocal = process.env.STRIPE_WH_KEY_LOCAL;
export const Mode = process.env.MODE;
export const URL_FRONT: string = process.env.URL_FRONT ?? "";

import nodemailer from "nodemailer";
import swagerdoc from "../swagger.json";

swagerdoc.host = process.env.HOST ?? "";

let logger = false;
if (process.env.MODE === "development") {
    logger = true;
}

export const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT) || 0,
    secure: true,
    auth: {
        user: process.env.SENDMAIL,
        pass: process.env.MIALPASS,
    },
    logger: logger,
});
