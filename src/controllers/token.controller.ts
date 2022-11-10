import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import bcrypt from "bcrypt";

import { TokenSchema, UserSchema } from "../models";

import { IToken, IUser } from "../types";

import { JWT_SECRET } from "../configs/constants";

import { resetPassword } from "../utils/email";

export function sendEmailToResetPassword(req: Request, res: Response): void {
    if (req.body.identifer) {
        const url = `${req.protocol}://${req.get("host")}`;

        UserSchema.findOne({
            $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
        })
            .then(user => {
                if (user) {
                    TokenSchema.findOne({
                        userId: user?._id,
                    })
                        .then(token => {
                            if (token) {
                                resetPassword(user!, token.token, url);
                                res.status(200).send({
                                    success: true,
                                    message: "Email sended",
                                    email: user?.email,
                                });
                            } else {
                                const userToken = jwt.sign(
                                    {
                                        hash: randomString.generate(100),
                                    },
                                    JWT_SECRET as string,
                                    {
                                        expiresIn: 86400,
                                    },
                                );

                                const token: IToken = new TokenSchema({
                                    userId: user?._id,
                                    token: userToken,
                                });

                                token.save();

                                resetPassword(user!, token.token, url);

                                res.status(200).send({
                                    success: true,
                                    message: "Email sended",
                                    email: user?.email,
                                });
                            }
                        })
                        .catch(() => {
                            res.status(401).send({
                                success: false,
                                message: "Server error",
                            });
                        });
                } else {
                    res.status(201).send({
                        success: true,
                        message: "User not found",
                    });
                }
            })
            .catch(() => {
                res.status(401).send({
                    success: false,
                    message: "Error has occured",
                });
            });
    } else {
        res.status(400).send({
            success: false,
            message: "Missing data",
        });
    }
}

export const verifyIfTokenExist = (req: Request, res: Response) => {
    if (req.body.token) {
        TokenSchema.findOne({
            token: req.body.token,
        })
            .then(token => {
                if (token) {
                    res.status(200).send({
                        success: true,
                        message: "Valid token",
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: "Invalid token",
                    });
                }
            })
            .catch(err => {
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
};

export const resetPasswordAndDeleteToken = (req: Request, res: Response) => {
    if (req.body.password && req.body.token) {
        const hashedPassword: string = bcrypt.hashSync(req.body.password, 10);

        TokenSchema.findOne({ token: req.body.token })
            .then((token: IToken | null) => {
                UserSchema.findByIdAndUpdate(
                    { _id: token?.userId },
                    { password: hashedPassword },
                    { new: true },
                )
                    .then((user: IUser | null) => {
                        TokenSchema.deleteOne({ userId: user?._id })
                            .then(() => {
                                res.status(200).send({
                                    success: true,
                                    message: "Password has been changed",
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    success: false,
                                    err: err,
                                });
                            });
                    })
                    .catch(err => {
                        res.status(401).send({
                            success: false,
                            message: err.message,
                        });
                    });
            })
            .catch(() => {
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
};
