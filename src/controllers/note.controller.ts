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
        success: true,
        message: `${note.title} has been added`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occured",
      });
    });
}

export async function getNotes(req: Request, res: Response) {
  if (req.query.userId) {
    NoteSchema.find({ userId: req.query.userId })
      .then((notes) => {
        res.status(200).send({
          success: true,
          notes,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Some error occured",
        });
      });
  } else {
    res.status(401).send({
      success: false,
      message: "Missing data",
    });
  }
}

export async function getNote(req: Request, res: Response) {
  NoteSchema.findById(req.query.id)
    .then((note) => {
      res.status(200).send({
        success: true,
        note,
      });
    })
    .catch((err) => {
      if (err.message.includes('for model "Note"')) {
        res.status(401).send({
          success: true,
          message: "Note not found",
          note: [],
        });
      } else {
        res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    });
}
