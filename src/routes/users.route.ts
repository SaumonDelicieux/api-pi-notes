import express from "express";
import { verifyToken } from "../helpers/verifyToken";
import {
  sendEmailForResetPassword,
  verifyIfTokenExist,
  resetPasswordAndDeleteToken,
} from "../controllers/token.controller";

import { login, register, getById } from "../controllers/user.controller";

export const usersRouter = express.Router();

usersRouter.post("/users/register", register);
usersRouter.post("/users/login", login);
usersRouter.post("/users/reset-password", sendEmailForResetPassword);
usersRouter.post("/users/token-check", verifyIfTokenExist);
usersRouter.post(
  "/users/update-password",
  verifyToken,
  resetPasswordAndDeleteToken
);
usersRouter.get("/users/getById", getById);
