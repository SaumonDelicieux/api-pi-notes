import mongoose from "mongoose";
import { INote } from "../types";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    folderId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        require: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
    },
    state: {
        type: String,
        enum: ["public", "archived", "junk"],
        default: "junk",
    },
    sharedWith: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    creationDate: {
        type: Date,
    },
    lastUpdateDate: {
        type: Date,
    },
});

export const NoteSchema = mongoose.model<INote>("Note", noteSchema);
