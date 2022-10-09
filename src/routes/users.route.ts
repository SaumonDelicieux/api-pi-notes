import express from "express";
import { register } from "../controllers/user.controller";

export const router = express.Router();

router.post("/register", register);
