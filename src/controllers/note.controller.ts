import { NoteSchema } from "../models";
import { Request, Response } from "express";
import { INote } from "../types";
import { cleanNotes } from "../schedules/cleanNote";

export async function createNote(req: Request, res: Response) {
    const note: INote = new NoteSchema({
        folderId: req.body.folderId,
        userId: req.body.userId,
        title: req.body.title,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
    });

    note.save()
        .then((note: INote) => {
            res.status(200).send({
                success: true,
                message: `${note.title} has been added`,
                note,
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occured",
            });
        });
}

export async function getNotes(req: Request, res: Response) {
    if (req.query.userId) {
        NoteSchema.find({ userId: req.query.userId })
            .then((notes: INote[]) => {
                res.status(200).send({
                    success: true,
                    notes,
                });
            })
            .catch(err => {
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
        .then(note => {
            res.status(200).send({
                success: true,
                note,
            });
        })
        .catch(err => {
            if (err.message.includes('for model "Note"')) {
                res.status(401).send({
                    success: true,
                    message: "Note not found",
                    note: [],
                });
            }
        });
}

export async function updateNote(req: Request, res: Response) {
    NoteSchema.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
        .then(note => {
            console.log(note);
            res.status(200).send({
                success: true,
                message: "The note has been updated",
                note,
            });
        })
        .catch(err => {
            res.status(401).send({
                success: false,
                message: `Error : ${err}`,
            });
        });
}

export async function deleteNote(req: Request, res: Response) {
    const noteId = req.query.noteId;

    NoteSchema.findByIdAndRemove(noteId)
        .then((data: INote | null) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete note with id=${noteId}. Maybe this note was not found !`,
                });
            } else {
                cleanNotes();
                res.status(200).send({
                    success: true,
                    message: "Note was deleted successfully!",
                    noteId,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete note with id=" + noteId,
            });
        });
}
