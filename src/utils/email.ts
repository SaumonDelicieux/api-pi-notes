import { transporter } from "../configs/index.config";
import { IMailOptions, IUserDetail } from "../types";
import fs from "fs";
import path from "path";

export async function registerSucces(user: IUserDetail) {
  let html = getTemplate("welcom");
  const reg = new RegExp("(__customer__)", "g");

  html = html.replace(reg, `${user.firstName} ${user.lastName}`);
  let htmltosend = getTemplate("base");
  const regbase = new RegExp("(__Template__)", "g");
  htmltosend = htmltosend.replace(regbase, html);

  const nodemailer: IMailOptions = {
    to: user.email,
    subject: "Welcome 👋👋👋👋👋👋",
    html: htmltosend,
  };
  sendMail(nodemailer);
}

export async function resetPasword(
  user: IUserDetail,
  token: string,
  urlfront: string
) {
  let html = getTemplate("resset");
  const reg = new RegExp("(__customer__)", "g");
  html = html.replace(reg, `${user.firstName} ${user.lastName}`);

  const reg2 = new RegExp("(__url__)", "g");
  html = html.replace(reg2, `${urlfront}/updatePassword?token=${token}`);

  let htmltosend = getTemplate("base");
  const regbase = new RegExp("(__Template__)", "g");
  htmltosend = htmltosend.replace(regbase, html);

  const nodemailer: IMailOptions = {
    to: user!.email,
    subject: "Reset password | PI'notes",
    html: htmltosend,
  };
  sendMail(nodemailer);
}

const getTemplate = (type = "base") => {
  return fs.readFileSync(
    path.join(__dirname, "../emails/template/", `template-${type}.html`),
    "utf-8"
  );
};

export async function sendMail(mailOptions: IMailOptions) {
  const mailOption: IMailOptions = {
    from: "Pi'note teams <noreply.pi-note@gmail.com>",
    replyTo: "noreply.pi-note@gmail.com",
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
