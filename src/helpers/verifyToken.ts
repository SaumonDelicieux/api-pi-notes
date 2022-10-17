import jwt from "jsonwebtoken";
import { jwtSecret } from "../configs/index.config";

export function verifyToken(req: any, res: any, next: any) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: "Missing token"
        })
    }

    jwt.verify(token, jwtSecret as string, function (error: any, jwtdecoded: any) {
        if (error) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "Not autorized"
            })
        }
        req.data = jwtdecoded;
        next();
    })
}