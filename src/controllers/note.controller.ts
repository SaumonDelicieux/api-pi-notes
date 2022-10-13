import { NoteSchema } from "../models/note.model";
import { Request, Response } from "express";

export async function createNote(req: Request, res: Response) {
  const note = new NoteSchema({
    folderID: req.body.folderID,
    title: req.body.title,
    text: req.body.text,
    state: "Brouillant",
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });

  note
    .save()
    .then((note) => {
      res.status(200).send({
        message: `${note.title} Note has been added`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
}

export async function getNotes(req: Request, res: Response) {
  NoteSchema.find({ folderID: req.body.folderID }).then((notes) => {
    res.status(200).send({
      notes,
    });
  });
}
