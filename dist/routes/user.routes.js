"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var token_controller_1 = require("../controllers/token.controller");
var user_controller_1 = require("../controllers/user.controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/users/register", user_controller_1.register);
exports.userRouter.post("/users/login", user_controller_1.login);
exports.userRouter.post("/users/sendEmailToResetPassword", token_controller_1.sendEmailToResetPassword);
exports.userRouter.post("/users/checkToken", token_controller_1.verifyIfTokenExist);
exports.userRouter.post("/users/updatePassword", token_controller_1.resetPasswordAndDeleteToken);
exports.userRouter.get("/users/getById", user_controller_1.getById);
