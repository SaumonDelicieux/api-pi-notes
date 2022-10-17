"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.login = exports.register = void 0;
var models_1 = require("../models");
var index_config_1 = require("../configs/index.config");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var email_1 = require("../utils/email");
function register(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, user;
        return __generator(this, function (_d) {
            hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10);
            user = new models_1.UserSchema({
                firstName: (_a = req.body.firstName) !== null && _a !== void 0 ? _a : "",
                lastName: (_b = req.body.lastName) !== null && _b !== void 0 ? _b : "",
                email: req.body.email,
                password: hashedPassword,
                phoneNumber: (_c = req.body.phoneNumber) !== null && _c !== void 0 ? _c : "",
                isPremium: false,
                creationDate: new Date(),
                lastUpdateDate: new Date(),
            });
            user
                .save()
                .then(function (user) {
                var userToken = jsonwebtoken_1.default.sign({
                    id: user._id,
                    isPremium: user.isPremium,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }, index_config_1.jwtSecret, {
                    expiresIn: "30d",
                    algorithm: "HS256",
                });
                var userSend = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                };
                (0, email_1.registerSucces)(userSend);
                res.status(200).send({
                    success: true,
                    token: userToken,
                    message: "User has been added",
                });
            })
                .catch(function (err) {
                res.status(500).send({
                    success: false,
                    message: err.message || "Some error occured",
                    email: req.body.email,
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.register = register;
function login(req, res) {
    if (req.body.identifer && req.body.password) {
        models_1.UserSchema.findOne({
            $or: [{ email: req.body.identifer }, { phoneNumber: req.body.identifer }],
        })
            .then(function (user) {
            var _a;
            if (!bcrypt_1.default.compareSync(req.body.password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : "")) {
                res.status(401).send({
                    success: false,
                    token: null,
                    message: "Invalid password",
                });
            }
            var userToken = jsonwebtoken_1.default.sign({
                id: user._id,
                isPremium: user === null || user === void 0 ? void 0 : user.isPremium,
                firstName: user === null || user === void 0 ? void 0 : user.firstName,
                lastName: user === null || user === void 0 ? void 0 : user.lastName,
            }, index_config_1.jwtSecret, {
                expiresIn: 86400,
            });
            res.status(200).send({
                success: true,
                token: userToken,
            });
        })
            .catch(function (err) {
            res.status(404).send({
                success: false,
                message: err.message || "Some error occured",
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
exports.login = login;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (req.query.id) {
                models_1.UserSchema.findById(req.query.id)
                    .then(function (user) {
                    var _a;
                    if (user) {
                        var userDetail = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            isPremium: user.isPremium,
                            phoneNumber: (_a = user.phoneNumber) !== null && _a !== void 0 ? _a : "",
                        };
                        res.status(200).send({
                            success: true,
                            message: "User Find",
                            user: userDetail,
                        });
                    }
                })
                    .catch(function () {
                    res.status(501).send({
                        success: true,
                        message: "User not found",
                    });
                });
            }
            else {
                res.status(400).send({
                    success: false,
                    message: "Missing data ID",
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.getById = getById;
