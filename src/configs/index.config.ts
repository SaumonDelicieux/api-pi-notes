export const port = process.env.PORT;
export const db = process.env.DB_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const urlFront = process.env.URL_FRONT;
export const swaggerPassword = process.env.SWAGGER_PASSWORD;
import nodemailer from "nodemailer";
import swagerdoc from "../swagger.json";

let host: string | undefined = process.env.HOST_DEV;
if (process.env.VITE_MODE === "staging") {
  host = process.env.HOST_STAGE;
} else if (process.env.VITE_MODE === "production") {
  host = process.env.HOST_PROD;
}

swagerdoc.host = host ?? "";

let logger = false;
if (process.env.VITE_MODE === "development") {
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
