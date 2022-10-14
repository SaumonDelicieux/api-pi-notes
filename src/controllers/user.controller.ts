import { UserSchema } from "../models";
import { Request, Response } from "express";
import { jwtSecret } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types";
import { registerSucces } from "../utils/email";

export async function register(req: Request, res: Response) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new UserSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    isPremium: false,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });
  user
    .save()
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
          password: user.password,
          subscription: user.isPremium,
        },
        jwtSecret as string,
        {
          expiresIn: "30d",
          algorithm: "HS256",
        }
      );

      const userSend: IUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      };
      registerSucces(userSend);

      res.status(200).send({
        message: "User has been added",
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.status(500).send({
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
        if (!bcrypt.compareSync(req.body.password, user!.password)) {
          res.status(401).send({
            message: "Invalid password",
            auth: false,
            token: null,
          });
          return false;
        }

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

        res.status(200).send({
          auth: true,
          token: userToken,
        });
      })
      .catch((err) => {
        res.status(404).send({
          auth: false,
          message: err.message || "Some error occured",
        });
      });
  } else {
    res.status(400).send({
      auth: false,
      message: "Missing data",
    });
  }
}

export async function getById(req: Request, res: Response) {
  if (req.body.id) {
    UserSchema.findById(req.body.id)
      .then((user) => {
        if (user) {
          const userDetail: IUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isPremium: user.isPremium,
            phoneNumber: user.phoneNumber ?? "",
          };
          res.status(200).send({
            succes: true,
            message: "User Find",
            user: userDetail,
          });
        }
      })
      .catch(() => {
        res.status(501).send({
          succes: true,
          message: "User not found",
        });
      });
  } else {
    res.status(400).send({
      succes: false,
      message: "Missing data ID",
    });
  }
}
