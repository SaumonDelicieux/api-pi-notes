import express from "express";
import { getEmailToShare, shareNote, deleteFromSharedWith, sharedWithList, getSharedNotes } from "../controllers/common.controller";
import { verifyToken } from "../helpers/verifyToken";

export const commonRouter = express.Router();

commonRouter.get("/commons/getEmailsToShare", verifyToken, getEmailToShare);
commonRouter.get("/commons/sharedWithList", verifyToken, sharedWithList);
commonRouter.get("/commons/getSharedNotes", verifyToken, getSharedNotes);
commonRouter.post("/commons/shareNote", verifyToken, shareNote);
commonRouter.put("/commons/deleteFromSharedWith", verifyToken, deleteFromSharedWith);
