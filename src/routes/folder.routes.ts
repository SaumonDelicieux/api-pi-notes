import express from "express";
import {
  createFolder,
  deleteFolder,
  updateFolderTitle,
  getFolders,
} from "../controllers/folder.controller";
import { verifyToken } from "../helpers/verifyToken";

export const folderRouter = express.Router();

folderRouter.post("/folders/createFolder", verifyToken, createFolder);
folderRouter.get("/folders/getAll", verifyToken, getFolders);
folderRouter.put("/folders/updateFolderTitle", verifyToken, updateFolderTitle);
folderRouter.delete("/folders/deleteFolder", verifyToken, deleteFolder);
