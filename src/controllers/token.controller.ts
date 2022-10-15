import { TokenSchema } from "../models/token.model";
import { UserSchema } from "../models/user.model";
import { IMailOptions } from "../types";
import { sendMail } from "../utils/email";
import { jwtSecret, urlFront } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

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
              message: "Email sended",
              email: user!.email,
            });
          })
          .catch(() => {
            const userToken = jwt.sign(
              {
                id: user!._id,
                isPremium: user!.isPremium,
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
              message: "Email sended",
              email: user!.email,
            });
          });
      })
      .catch(() => {
        res.status(401).send({
          message: "User not found",
        });
      });
  } else {
    res.status(400).send({
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
              auth: true,
              message: "Valid token",
            });
          }
        } else {
          res.status(401).send({
            auth: false,
            message: "Token expired or not valid",
          });
        }
      })
      .catch((err) => {
        res.status(401).send({
          auth: false,
          message: err.message,
        });
      });
  } else {
    res.status(400).send({
      message: "Missing data",
    });
  }
}

export function resetPasswordAndDeleteToken(req: any, res: Response): void {
  if (req.data && req.body.password) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    UserSchema.findByIdAndUpdate(
      { _id: req.data.id },
      { password: hashedPassword },
      { new: true }
    )
      .then((user) => {
        if (user) {
          user.password = hashedPassword;
          user.lastUpdateDate = new Date();
          user
            ?.save()
            .then(() => {
              TokenSchema.deleteOne({ userId: req.data.id })
                .then(() => {
                  res.status(200).send({
                    message: "Password has been changed",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    err: err,
                  });
                });
            })
            .catch((err) => {
              res.status(401).send({
                message: err,
              });
            });
        }
      })
      .catch(() => {
        res.status(401).send({
          message: "User not found",
        });
      });
  } else {
    res.status(401).send({
      message: "Missing data",
    });
  }
}
