import nodemailer from "nodemailer";

import { MODE, PASS_MAIL, SEND_MAIL } from "./constants";

const logger = MODE === "development";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    secure: true,
    auth: {
        user: SEND_MAIL,
        pass: PASS_MAIL,
    },
    logger,
});
