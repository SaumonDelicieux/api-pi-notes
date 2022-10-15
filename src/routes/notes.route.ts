import express from "express";
import { createNote, getNotes, getNote } from "../controllers/note.controller";

export const notesRouter = express.Router();

notesRouter.post("/notes/createNote", createNote);
notesRouter.get("/notes/getAll", getNotes);
notesRouter.get("/notes/getById", getNote);
