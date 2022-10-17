import { TokenSchema } from "../models/token.model";
import { UserSchema } from "../models/user.model";
import { IMailOptions } from "../types";
import { sendMail } from "../utils/email";
import { jwtSecret, urlFront } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import randomString from "randomstring";

export function sendEmailToResetPassword(req: Request, res: Response): void {
  if (req.body.identifer) {
    UserSchema.findOne({
      $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
    })
      .then((user) => {
        TokenSchema.findOne({
          userId: user!._id,
        })
          .then((token) => {
            const nodemailer: IMailOptions = {
              to: user!.email,
              subject: "Reset password | PI'notes",
              html: `<p>${urlFront}/api/v1/users/tokenCheck?token=${
                token!.token
              }</p>`,
            };
            sendMail(nodemailer);

            res.status(200).send({
              success: true,
              message: "Email sended",
              email: user!.email,
            });
          })
          .catch(() => {
            const userToken = jwt.sign(
              {
                hash: randomString.generate(100),
              },
              jwtSecret as string,
              {
                expiresIn: 86400,
              }
            );

            const token = new TokenSchema({
              userId: user!._id,
              token: userToken,
            });

            token.save();

            const nodemailer: IMailOptions = {
              to: user!.email,
              subject: "Reset password | PI'notes",
              html: `<p>http://localhost:3001/api/v1/users/tokenCheck?token=${
                token!.token
              }</p>`,
            };

            sendMail(nodemailer);

            res.status(200).send({
              success: true,
              message: "Email sended",
              email: user!.email,
            });
          });
      })
      .catch(() => {
        res.status(401).send({
          success: false,
          message: "User not found",
        });
      });
  } else {
    res.status(400).send({
      success: false,
      message: "Missing data",
    });
  }
}

export function verifyIfTokenExist(req: Request, res: Response): void {
  if (req.body.token) {
    TokenSchema.findOne({
      token: req.body.token,
    })
      .then((token) => {
        if (token) {
          if (token!.token === req.body.token) {
            res.status(200).send({
              success: true,
              message: "Valid token",
            });
          }
        } else {
          res.status(401).send({
            success: false,
            message: "Token expired or not valid",
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          success: false,
          message: err.message,
        });
      });
  } else {
    res.status(400).send({
      success: false,
      message: "Missing data",
    });
  }
}

export function resetPasswordAndDeleteToken(req: any, res: Response): void {
  if (req.headers["authorization"] && req.body.password) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const tokenUser = req.headers["authorization"];

    TokenSchema.findOne({ token: tokenUser })
      .then((token) => {
        UserSchema.findByIdAndUpdate(
          { _id: token!.userId },
          { password: hashedPassword },
          { new: true }
        )
          .then((user) => {
            TokenSchema.deleteOne({ userId: user!._id })
              .then(() => {
                res.status(200).send({
                  success: true,
                  message: "Password has been changed",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  err: err,
                });
              });
          })
          .catch((err) => {
            res.status(401).send({
              success: false,
              message: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(401).send({
          success: false,
          message: "Token not found",
        });
      });
  } else {
    res.status(401).send({
      success: false,
      message: "Missing data",
    });
  }
}
