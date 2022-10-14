import { NoteSchema } from "../models";
import { Request, Response } from "express";

export async function createNote(req: Request, res: Response) {
  const note = new NoteSchema({
    folderId: req.body.folderId,
    userId: req.body.userId,
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
        succes: true,
        message: `${note.title} has been added`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        succes: false,
        message: err.message || "Some error occured",
      });
    });
}

export async function getNotes(req: Request, res: Response) {
  NoteSchema.find({ userId: req.body.userId })
    .then((notes) => {
      res.status(200).send({
        succes: true,
        notes,
      });
    })
    .catch((err) => {
      res.status(500).send({
        succes: false,
        message: "Some error occured",
      });
    });
}

export async function getNote(req: Request, res: Response) {
  NoteSchema.findById(req.body.id)
    .then((note) => {
      res.status(200).send({
        succes: true,
        note,
      });
    })
    .catch((err) => {
      if (err.message.includes('for model "Note"')) {
        res.status(401).send({
          succes: true,
          message: "Note not found",
          note: [],
        });
      } else {
        res.status(500).send({
          succes: false,
          message: err.message,
        });
      }
    });
}
