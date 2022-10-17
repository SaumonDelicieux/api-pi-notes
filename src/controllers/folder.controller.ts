import { FolderSchema, UserSchema } from "../models";
import { Request, Response } from "express";
import { IFolders, IUser } from "../types";

export async function createFolder(req: Request, res: Response) {
  UserSchema.findById(req.body.userId)
    .then((user: IUser | null) => {
      const folder: IFolders = new FolderSchema({
        title: req.body.title,
        userId: req.body.userId,
        parentId: req.body.parentId,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
      });

      folder
        .save()
        .then((folder: IFolders) => {
          res.status(200).send({
            success: true,
            message: `${folder.title} has been added`,
            folder,
          });
        })
        .catch((err) => {
          if (err.message.toString().includes("Folder validation failed")) {
            res.status(401).send({
              success: false,
              message: "Parent Folder not found",
            });
          } else {
            res.status(500).send({
              success: false,
              message: err.message || "Some error occured",
            });
          }
        });
    })
    .catch((err) => {
      if (err.message.toString().includes('model "User"')) {
        res.status(401).send({
          success: false,
          message: "user not found",
        });
      } else {
        res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    });
}

export async function getFolders(req: Request, res: Response) {
  FolderSchema.find({
    userId: req.query.userId,
  })
    .then((folders: IFolders[]) => {
      res.status(200).send({
        success: true,
        folders,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err || "Some error occured",
      });
    });
}

export async function deleteFolder(req: Request, res: Response) {
  const folderId = req.query.folderId;

  FolderSchema.findByIdAndRemove(folderId)
    .then((data: IFolders | null) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete note with id=${folderId}. Maybe this note was not found !`,
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Folder was deleted successfully!",
          folderId,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete note with id=" + folderId,
      });
    });
}
