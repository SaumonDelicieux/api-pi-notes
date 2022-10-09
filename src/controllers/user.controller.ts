import { Identifier } from "./../../node_modules/typescript/lib/typescript.d";
import { UserSchema } from "../models/user.model";
import { Request, Response } from "express";
import { jwtSecret } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new UserSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    isPremium: false,
    dateOfInscription: new Date(),
    lastUpdateDate: new Date(),
  });
  const a = await UserSchema.findOne({ user });
  if (a) {
    res.status(409).send({ message: "User alerdy exist" });
    return false;
  }
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

      res.status(200).send({
        message: "Utilisateur bien ajouter",
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
  UserSchema.findOne({
    $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
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
          password: user!.password,
          subscription: user!.isPremium,
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
    .catch(() => {
      res.status(404).send({
        auth: false,
        message: "Identifier not valid",
      });
    });
}
