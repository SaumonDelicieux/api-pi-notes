import express from "express";
import { createNote } from "../controllers/note.controller";

export const notesRouter = express.Router();

notesRouter.post("/notes/create-note", createNote);
