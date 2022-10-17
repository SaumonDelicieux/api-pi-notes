import express from "express";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/folder.controller";

export const folderRouter = express.Router();

folderRouter.post("/folders/createFolder", createFolder);
folderRouter.get("/folders/getAll", getFolders);
folderRouter.delete("/folders/deleteFolder", deleteFolder);
