import { NoteSchema } from "../models/note.model";
import { Request, Response } from "express";

export async function createNote(req: Request, res: Response) {

  const note = new NoteSchema({
    title: req.body.title,
    text: req.body.text,
    state: req.body.state,
    dateOfInscription: new Date(),
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