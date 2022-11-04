import { Request, Response } from "express";

import { UserSchema, NoteSchema } from "../models";

export const getEmailToShare = async (req: Request, res: Response) => {
    if (req.query.search) {
        const regSearch = new RegExp(`^${req.query.search}`, "i");
        const noteId = req.query.noteId;
        const usersToSuggest: { id: string; email: string }[] = [];

        UserSchema.find({
            $or: [{ firstName: regSearch }, { lastName: regSearch }, { email: regSearch }],
        })
            .then(async users => {
                const note = await NoteSchema.findById(noteId);
                users.forEach(user => {
                    if (
                        !note?.sharedWith.includes(user._id) &&
                        note?.userId.toString() !== user._id.toString()
                    ) {
                        usersToSuggest.push({ id: user._id, email: user.email });
                    }
                });
                res.status(200).send({
                    success: true,
                    usersToSuggest,
                });
            })
            .catch(err => {
                res.status(401).send({
                    success: false,
                    message: err,
                });
            });
    } else {
        res.status(401).send({
            success: false,
            message: "Missing data",
        });
    }
};

export const shareNote = async (req: Request, res: Response) => {
    const noteId = req.body.noteId;
    const usersId = req.body.usersId;

    NoteSchema.findByIdAndUpdate({ _id: noteId }, { $push: { sharedWith: usersId } }, { new: true })
        .then(note => {
            res.status(200).send({
                success: true,
                note,
            });
        })
        .catch(err => {
            res.status(401).send({
                success: false,
                message: err,
            });
        });
};

export const deleteFromSharedWith = async (req: Request, res: Response) => {
    const noteId = req.body.noteId;
    const userId = req.body.userId;

    NoteSchema.findByIdAndUpdate({ _id: noteId }, { $pull: { sharedWith: userId } }, { new: true })
        .then(note => {
            res.status(200).send({
                success: true,
                note,
            });
        })
        .catch(err => {
            res.status(401).send({
                success: false,
                message: err.message,
            });
        });
};
