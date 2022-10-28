import express from "express";
import {
  sendEmailToResetPassword,
  verifyIfTokenExist,
  resetPasswordAndDeleteToken,
} from "../controllers/token.controller";
import { verifyToken } from "../helpers/verifyToken";

import {
  login,
  register,
  getById,
  updateProfile,
} from "../controllers/user.controller";

export const userRouter = express.Router();

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/sendEmailToResetPassword", sendEmailToResetPassword);
userRouter.post("/users/checkToken", verifyIfTokenExist);
userRouter.put("/users/updatePassword", resetPasswordAndDeleteToken);
userRouter.put("/users/updateProfile", verifyToken, updateProfile);
userRouter.get("/users/getById", verifyToken, getById);
