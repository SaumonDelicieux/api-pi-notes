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
          //await getFolders(user?._id);
          res.status(200).send({
            succes: true,
            message: `${folder.title} has been added`,
          });
        })
        .catch((err) => {
          if (err.message.toString().includes("Folder validation failed")) {
            res.status(401).send({
              succes: false,
              message: "Parent Folder not found",
            });
          } else {
            res.status(500).send({
              succes: false,
              message: err.message || "Some error occured",
            });
          }
        });
    })
    .catch((err) => {
      if (err.message.toString().includes('model "User"')) {
        res.status(401).send({
          succes: false,
          message: "user not found",
        });
      } else {
        res.status(500).send({
          succes: false,
          message: err.message,
        });
      }
    });
}

export async function getFolders(
  req?: Request,
  res?: Response
  // userId?: string
) {
  /*   if(userId){
    FolderSchema.find({
      userId: req.query.userId,
    })
      .then((folders) => {return folders}
  }else  */ if (res && req) {
    FolderSchema.find({
      userId: req.query.userId,
    })
      .then((folders) => {
        const groupedFolder: { [key: string]: Array<IFolders> } = {};
        folders.forEach((element) => {
          orderFolders(element, groupedFolder);
        });
        const groupedFolders = Object.entries(groupedFolder);
        res.status(200).send({
          succes: true,
          groupedFolders,
        });
        return groupedFolders;
      })
      .catch((err) => {
        if (err.message.toString().includes("userId")) {
          res.status(403).send({
            succes: false,
            message: "User no found",
          });
        }
        res.status(500).send({
          succes: false,
          message: err || "Some error occured",
        });
      });
  }
}

async function orderFolders(
  element: IFolders,
  groupedFolder: { [key: string]: Array<IFolders> }
) {
  const key = element.parentId ?? "Root";
  if (groupedFolder[key] != null) {
    groupedFolder[key].push(element);
  } else {
    groupedFolder[key] = [element];
  }
}
