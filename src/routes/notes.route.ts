import express from "express";
import { createNote, getNotes, getNote } from "../controllers/note.controller";

export const notesRouter = express.Router();

notesRouter.post("/notes/createNote", createNote);
notesRouter.get("/notes/getNotes", getNotes);
notesRouter.get("/notes/getNote", getNote);
