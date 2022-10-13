import { createFolder } from "../controllers/folder.controller";

const express = require("express");
export const foldersRouter = express.Router();

foldersRouter.post("/folders/create-folder", createFolder);
