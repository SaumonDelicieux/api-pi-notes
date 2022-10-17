import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  deleteNote,
} from "../controllers/note.controller";

export const noteRouter = express.Router();

noteRouter.post("/notes/createNote", createNote);
noteRouter.get("/notes/getAll", getNotes);
noteRouter.get("/notes/getById", getNote);
noteRouter.delete("/notes/deleteNote", deleteNote);