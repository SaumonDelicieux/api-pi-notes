import express from "express";
import { getEmailToShare, shareNote, deleteFromSharedWith, sharedWithList } from "../controllers/common.controller";
import { verifyToken } from "../helpers/verifyToken";

export const commonRouter = express.Router();

commonRouter.get("/commons/getEmailsToShare", verifyToken, getEmailToShare);
commonRouter.post("/commons/shareNote", verifyToken, shareNote);
commonRouter.get("/commons/sharedWithList", verifyToken, sharedWithList);
commonRouter.put("/commons/deleteFromSharedWith", verifyToken, deleteFromSharedWith);
