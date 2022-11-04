import { TokenSchema, UserSchema } from "../models";
import { IToken, IUser } from "../types";
import { jwtSecret } from "../configs/index.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import randomString from "randomstring";
import { resetPasword } from "../utils/email";
import { URL_FRONT } from "../configs/index.config";

export function sendEmailToResetPassword(req: Request, res: Response): void {
    if (req.body.identifer) {
        UserSchema.findOne({
            $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
        })
            .then(user => {
                TokenSchema.findOne({
                    userId: user?._id,
                })
                    .then(token => {
                        if (token) {
                            resetPasword(user!, token.token, URL_FRONT);
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
                                jwtSecret as string,
                                {
                                    expiresIn: 86400,
                                },
                            );

                            const token: IToken = new TokenSchema({
                                userId: user?._id,
                                token: userToken,
                            });

                            token.save();

                            resetPasword(user!, token.token, URL_FRONT);

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
}

export function resetPasswordAndDeleteToken(req: any, res: Response): void {
    if (req.headers["token"] && req.body.password) {
        const hashedPassword: string = bcrypt.hashSync(req.body.password, 10);
        const tokenUser = req.headers["token"];

        TokenSchema.findOne({ token: tokenUser })
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
}
