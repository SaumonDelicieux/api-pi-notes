import express from "express";
import { getEmailToShare, shareNote } from "../controllers/common.controller";
import { verifyToken } from "../helpers/verifyToken";

export const commonRouter = express.Router();

commonRouter.get("/commons/getEmailsToShare", verifyToken, getEmailToShare);
commonRouter.post("/commons/shareNote", verifyToken, shareNote);
