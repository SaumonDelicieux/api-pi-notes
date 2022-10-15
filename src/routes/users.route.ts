import express from "express";
import { verifyToken } from "../helpers/verifyToken";
import {
  sendEmailToResetPassword,
  verifyIfTokenExist,
  resetPasswordAndDeleteToken,
} from "../controllers/token.controller";

import { login, register, getById } from "../controllers/user.controller";

export const usersRouter = express.Router();

usersRouter.post("/users/register", register);
usersRouter.post("/users/login", login);
usersRouter.post("/users/sendEmailToResetPassword", sendEmailToResetPassword);
usersRouter.post("/users/checkToken", verifyIfTokenExist);
usersRouter.post(
  "/users/updatePassword",
  verifyToken,
  resetPasswordAndDeleteToken
);
usersRouter.get("/users/getById", getById);
