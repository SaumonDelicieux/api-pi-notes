import { UserSchema } from "../models";
import { Request, Response } from "express";
import { jwtSecret } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IUserDetail } from "../types";
import { registerSucces } from "../utils/email";

export async function register(req: Request, res: Response) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user: IUser = new UserSchema({
    firstName: req.body.firstName ?? "",
    lastName: req.body.lastName ?? "",
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber ?? "",
    isPremium: false,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });

  user
    .save()
    .then((user: IUser) => {
      const userToken = jwt.sign(
        {
          id: user._id,
          isPremium: user.isPremium,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        jwtSecret as string,
        {
          expiresIn: "30d",
          algorithm: "HS256",
        }
      );

      const userSend: IUserDetail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      };
      registerSucces(userSend);

      res.status(200).send({
        success: true,
        token: userToken,
        message: "User has been added",
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occured",
        email: req.body.email,
      });
    });
}

export function login(req: Request, res: Response): void {
  if (req.body.identifer && req.body.password) {
    UserSchema.findOne({
      $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
    })
      .then((user) => {
        if (!bcrypt.compareSync(req.body.password, user?.password ?? "")) {
          res.status(401).send({
            success: false,
            token: null,
            message: "Invalid password",
          });
        }

        const userToken = jwt.sign(
          {
            id: user!._id,
            isPremium: user?.isPremium,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email
          },
          jwtSecret as string,
          {
            expiresIn: 86400,
          }
        );

        res.status(200).send({
          success: true,
          token: userToken,
        });
      })
      .catch((err) => {
        res.status(404).send({
          success: false,
          message: err.message || "Some error occured",
        });
      });
  } else {
    res.status(400).send({
      success: false,
      message: "Missing data",
    });
  }
}

export async function getById(req: Request, res: Response) {
  if (req.query.id) {
    UserSchema.findById(req.query.id)
      .then((user) => {
        if (user) {
          const userDetail: IUserDetail = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isPremium: user.isPremium,
            phoneNumber: user.phoneNumber ?? "",
          };
          res.status(200).send({
            success: true,
            message: "User Find",
            user: userDetail,
          });
        }
      })
      .catch(() => {
        res.status(501).send({
          success: true,
          message: "User not found",
        });
      });
  } else {
    res.status(400).send({
      success: false,
      message: "Missing data ID",
    });
  }
}
