import express from "express";

import {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
} from "../controllers/note.controller";

import { verifyToken } from "../helpers/verifyToken";

export const noteRouter = express.Router();

noteRouter.post("/notes/createNote", verifyToken, createNote);
noteRouter.get("/notes/getAll", verifyToken, getNotes);
noteRouter.get("/notes/getById", verifyToken, getNote);
noteRouter.put("/notes/updateNote", verifyToken, updateNote);
noteRouter.delete("/notes/deleteNote", verifyToken, deleteNote);
