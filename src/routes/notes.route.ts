import { createNote } from "../controllers/note.controller";

const express = require("express");
export const notesRouter = express.Router();

notesRouter.post("/notes/create-note", createNote);
