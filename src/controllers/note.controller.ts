import { NoteSchema } from "../models";
import { Request, Response } from "express";
import { INote } from "../types";

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
  if (req.body.userId) {
    NoteSchema.find({ userId: req.body.userId })
      .then((notes) => {
        const groupedNotes: { [key: string]: Array<INote> } = {};
        notes.forEach((element) => {
          const key = element.userId ?? "Root";
          if (groupedNotes[key] != null) {
            groupedNotes[key].push(element);
          } else {
            groupedNotes[key] = [element];
          }
        });
        res.status(200).send({
          succes: true,
          groupedNotes,
        });
      })
      .catch((err) => {
        res.status(500).send({
          succes: false,
          message: "Some error occured",
        });
      });
  } else {
    res.status(401).send({
      succes: false,
      message: "Missing data"
    })
  }
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
