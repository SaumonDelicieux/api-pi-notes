import express from "express";
import { createFolder, getFolders } from "../controllers/folder.controller";

export const foldersRouter = express.Router();

foldersRouter.post("/folders/createFolder", createFolder);
foldersRouter.get("/folders/getFolders", getFolders);
