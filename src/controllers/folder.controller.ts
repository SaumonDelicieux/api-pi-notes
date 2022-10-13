import { FolderSchema } from "../models/folder.model";
import { Request, Response } from "express";

export async function createFolder(req: Request, res: Response) {

  const folder = new FolderSchema({
    title: req.body.title,
    userId: req.body.userId,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });
  
  folder
    .save()
    .then((folder) => {
      res.status(200).send({
        message: `${folder.title} Folder has been added`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
}