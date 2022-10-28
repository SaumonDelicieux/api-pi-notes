import { UserSchema, NoteSchema } from "../models";
import { Request, Response } from "express";

export async function getEmailToShare(req: Request, res: Response) {
  if (req.query.search) {
    const regSearch = new RegExp(`^${req.query.search}`, "i");
    const noteId = req.query.noteId;
    const emails: string[] = [];

    UserSchema.find({
      $or: [
        { firstName: regSearch },
        { lastName: regSearch },
        { email: regSearch },
      ],
    })
      .then(async (users) => {
        const note = await NoteSchema.findById(noteId);
        users.forEach((user) => {
          if (
            !note?.sharedWith.includes(user._id) &&
            note?.userId.toString() !== user._id.toString()
          ) {
            emails.push(user.email);
          }
        });

        res.status(200).send({
          success: true,
          emails,
        });
      })
      .catch((err) => {
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

  NoteSchema.findByIdAndUpdate(
    { _id: noteId },
    { $push: { sharedWith: usersId } },
    { new: true }
  )
    .then((note) => {
      res.status(200).send({
        success: true,
        note,
      });
    })
    .catch((err) => {
      res.status(401).send({
        success: false,
        message: err,
      });
    });
}
