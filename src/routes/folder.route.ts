import express from "express";
import { createFolder } from "../controllers/folder.controller";

export const foldersRouter = express.Router();

foldersRouter.post("/folders/create-folder", createFolder);
