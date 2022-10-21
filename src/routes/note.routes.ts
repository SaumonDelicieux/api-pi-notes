import express from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";

export const noteRouter = express.Router();

noteRouter.post("/notes/createNote", createNote);
noteRouter.get("/notes/getAll", getNotes);
noteRouter.get("/notes/getById", getNote);
noteRouter.put("/notes/updateNote", updateNote);
noteRouter.delete("/notes/deleteNote", deleteNote);
