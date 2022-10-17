import express from "express";
import {
  sendEmailToResetPassword,
  verifyIfTokenExist,
  resetPasswordAndDeleteToken,
} from "../controllers/token.controller";

import { login, register, getById } from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/sendEmailToResetPassword", sendEmailToResetPassword);
userRouter.post("/users/checkToken", verifyIfTokenExist);
userRouter.post("/users/updatePassword", resetPasswordAndDeleteToken);
userRouter.get("/users/getById", getById);
