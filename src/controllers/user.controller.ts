import { UserSchema } from "../models/user.model";
import { Request, Response } from "express";
import { jwtSecret } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function register(req: Request, res: Response): void {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new UserSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    isPremium: req.body.isPremium,
    dateOfInscription: Date(),
    lastUpdateDate: Date(),
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

      res.status(200).send({
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
