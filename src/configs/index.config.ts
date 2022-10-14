export const port = process.env.PORT;
export const db = process.env.DB_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const urlFront = process.env.URL_FRONT;
const nodemailer = require("nodemailer");
export const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  secure: true,
  auth: {
    user: process.env.SENDMAIL,
    pass: process.env.MIALPASS,
  },
});
