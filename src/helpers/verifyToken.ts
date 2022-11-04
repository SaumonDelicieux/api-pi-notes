import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../configs/constants";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: "Missing token",
        });
    }

    jwt.verify(token, JWT_SECRET as string, (error, user) => {
        if (error) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "Not autorized",
            });
        }

        req.user = user;
        next();
    });
};
