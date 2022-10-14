import express from "express";
import { login, register, getById } from "../controllers/user.controller";

export const usersRouter = express.Router();

usersRouter.post("/users/register", register);
usersRouter.post("/users/login", login);
usersRouter.get("/users/getById", getById);
