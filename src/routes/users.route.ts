import { login, register } from "../controllers/user.controller";

const express = require("express");
export const usersRouter = express.Router();

usersRouter.post("/users/register", register);
usersRouter.post("/users/login", login);
