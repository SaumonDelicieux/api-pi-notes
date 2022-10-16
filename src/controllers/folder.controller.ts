import { FolderSchema, UserSchema } from "../models";
import { Request, Response } from "express";
import { IFolders } from "../types";

export async function createFolder(req: Request, res: Response) {
  UserSchema.findById(req.body.userId)
    .then((user) => {
      const folder = new FolderSchema({
        title: req.body.title,
        userId: req.body.userId,
        parentId: req.body.parentId,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
      });

      folder
        .save()
        .then((folder) => {
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
    .then((folders) => {
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
