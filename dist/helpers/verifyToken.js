"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_config_1 = require("../configs/index.config");
function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: "Missing token"
        });
    }
    jsonwebtoken_1.default.verify(token, index_config_1.jwtSecret, function (error, jwtdecoded) {
        if (error) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "Not autorized"
            });
        }
        req.data = jwtdecoded;
        next();
    });
}
exports.verifyToken = verifyToken;
