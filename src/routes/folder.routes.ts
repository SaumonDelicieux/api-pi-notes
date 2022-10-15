import express from "express";
import { createFolder, getFolders } from "../controllers/folder.controller";

export const folderRouter = express.Router();

folderRouter.post("/folders/createFolder", createFolder);
folderRouter.get("/folders/getAll", getFolders);
