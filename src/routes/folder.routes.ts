import express from "express";
import {
  createFolder,
  deleteFolder,
  updateFolderTitle,
  getFolders,
} from "../controllers/folder.controller";

export const folderRouter = express.Router();

folderRouter.post("/folders/createFolder", createFolder);
folderRouter.get("/folders/getAll", getFolders);
folderRouter.put("/folders/updateFolderTitle", updateFolderTitle);
folderRouter.delete("/folders/deleteFolder", deleteFolder);
