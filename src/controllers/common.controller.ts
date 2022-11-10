import { UserSchema, NoteSchema } from "../models";
import { Request, Response } from "express";

export async function getEmailToShare(req: Request, res: Response) {
    if (req.query.search) {
        const regSearch = new RegExp(`^${req.query.search}`, "i");
        const noteId = req.query.noteId;
        const usersToSuggest: { value: string; label: string }[] = [];

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
                        usersToSuggest.push({ value: user._id, label: user.email });
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
}

export async function shareNote(req: Request, res: Response) {
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
}

export async function sharedWithList(req: Request, res: Response) {
    const noteId = req.query.noteId;

    NoteSchema.findById(noteId)
        .then(note => {
            const sharedWithIds = note?.sharedWith;
            UserSchema.find({
                _id: { $in: sharedWithIds },
            })
                .then(users => {
                    const usersNames: { userName: string; userId: string }[] = [];
                    users.forEach(user => {
                        usersNames.push({
                            userName: `${user?.firstName} ${user?.lastName}`,
                            userId: user._id,
                        });
                    });
                    res.status(200).send({
                        success: true,
                        usersNames,
                    });
                })
                .catch(err => {
                    res.status(401).send({
                        success: false,
                        message: err.message,
                    });
                });
        })
        .catch(err => {
            res.status(401).send({
                success: false,
                message: err.message,
            });
        });
}

export async function getSharedNotes(req: any, res: Response) {
    const userId = req.data.id;

    NoteSchema.find({ sharedWith: { $in: userId } })
        .then(notes => {
            res.status(200).send({
                success: true,
                notes,
            });
        })
        .catch(err => {
            res.status(401).send({
                success: false,
                message: err,
            });
        });
}

export async function deleteFromSharedWith(req: Request, res: Response) {
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
}
