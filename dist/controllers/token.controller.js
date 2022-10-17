"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordAndDeleteToken = exports.verifyIfTokenExist = exports.sendEmailToResetPassword = void 0;
var token_model_1 = require("../models/token.model");
var user_model_1 = require("../models/user.model");
var email_1 = require("../utils/email");
var index_config_1 = require("../configs/index.config");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var randomstring_1 = __importDefault(require("randomstring"));
function sendEmailToResetPassword(req, res) {
    if (req.body.identifer) {
        user_model_1.UserSchema.findOne({
            $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
        })
            .then(function (user) {
            token_model_1.TokenSchema.findOne({
                userId: user === null || user === void 0 ? void 0 : user._id,
            })
                .then(function (token) {
                var nodemailer = {
                    to: user.email,
                    subject: "Reset password | PI'notes",
                    html: "<p>".concat(index_config_1.urlFront, "/api/v1/users/tokenCheck?token=").concat(token === null || token === void 0 ? void 0 : token.token, "</p>"),
                };
                (0, email_1.sendMail)(nodemailer);
                res.status(200).send({
                    success: true,
                    message: "Email sended",
                    email: user === null || user === void 0 ? void 0 : user.email,
                });
            })
                .catch(function () {
                var userToken = jsonwebtoken_1.default.sign({
                    hash: randomstring_1.default.generate(100),
                }, index_config_1.jwtSecret, {
                    expiresIn: 86400,
                });
                var token = new token_model_1.TokenSchema({
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    token: userToken,
                });
                token.save();
                var nodemailer = {
                    to: user.email,
                    subject: "Reset password | PI'notes",
                    html: "<p>http://localhost:3001/api/v1/users/tokenCheck?token=".concat(token === null || token === void 0 ? void 0 : token.token, "</p>"),
                };
                (0, email_1.sendMail)(nodemailer);
                res.status(200).send({
                    success: true,
                    message: "Email sended",
                    email: user === null || user === void 0 ? void 0 : user.email,
                });
            });
        })
            .catch(function () {
            res.status(401).send({
                success: false,
                message: "User not found",
            });
        });
    }
    else {
        res.status(400).send({
            success: false,
            message: "Missing data",
        });
    }
}
exports.sendEmailToResetPassword = sendEmailToResetPassword;
function verifyIfTokenExist(req, res) {
    if (req.body.token) {
        token_model_1.TokenSchema.findOne({
            token: req.body.token,
        })
            .then(function (token) {
            if (token) {
                if (token.token === req.body.token) {
                    res.status(200).send({
                        success: true,
                        message: "Valid token",
                    });
                }
            }
            else {
                res.status(401).send({
                    success: false,
                    message: "Token expired or not valid",
                });
            }
        })
            .catch(function (err) {
            res.status(401).send({
                success: false,
                message: err.message,
            });
        });
    }
    else {
        res.status(400).send({
            success: false,
            message: "Missing data",
        });
    }
}
exports.verifyIfTokenExist = verifyIfTokenExist;
function resetPasswordAndDeleteToken(req, res) {
    if (req.headers["authorization"] && req.body.password) {
        var hashedPassword_1 = bcrypt_1.default.hashSync(req.body.password, 10);
        var tokenUser = req.headers["authorization"];
        token_model_1.TokenSchema.findOne({ token: tokenUser })
            .then(function (token) {
            user_model_1.UserSchema.findByIdAndUpdate({ _id: token === null || token === void 0 ? void 0 : token.userId }, { password: hashedPassword_1 }, { new: true })
                .then(function (user) {
                token_model_1.TokenSchema.deleteOne({ userId: user === null || user === void 0 ? void 0 : user._id })
                    .then(function () {
                    res.status(200).send({
                        success: true,
                        message: "Password has been changed",
                    });
                })
                    .catch(function (err) {
                    res.status(500).json({
                        success: false,
                        err: err,
                    });
                });
            })
                .catch(function (err) {
                res.status(401).send({
                    success: false,
                    message: err.message,
                });
            });
        })
            .catch(function () {
            res.status(401).send({
                success: false,
                message: "Token not found",
            });
        });
    }
    else {
        res.status(401).send({
            success: false,
            message: "Missing data",
        });
    }
}
exports.resetPasswordAndDeleteToken = resetPasswordAndDeleteToken;
