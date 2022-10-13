import express from "express";
import { createNote, getNotes } from "../controllers/note.controller";

export const notesRouter = express.Router();

notesRouter.post("/notes/createNote", createNote);
notesRouter.post("/notes/getNotes", getNotes);
