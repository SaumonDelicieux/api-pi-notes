import { transporter } from "../configs/index.config";
import { IMailOptions, IUser } from "../types";
import fs from "fs";
import path from "path";

export async function registerSucces(user: IUser) {
  let htmltosend = getTemplate("welcom");
  const reg = new RegExp("(__customer__)", "g");
  htmltosend = htmltosend.replace(reg, `${user.firstName} ${user.lastName}`);
  const nodemailer: IMailOptions = {
    to: user.email,
    subject: "Welcome 👋👋👋👋👋👋",
    html: htmltosend,
  };
  sendMail(nodemailer);
}
const getTemplate = (type = "basic") => {
  return fs.readFileSync(
    path.join(__dirname, "../emails/template/", `template-${type}.html`),
    "utf-8"
  );
};

export async function sendMail(mailOptions: IMailOptions) {
  const mailOption: IMailOptions = {
    from: "no-replay@gmail.com",
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html,
  };
  transporter.sendMail(mailOption, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
