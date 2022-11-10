import mongoose from "mongoose";

import { IFolder } from "../types/IFolder";

const Schema = mongoose.Schema;

const folderSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        require: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    creationDate: {
        type: Date,
    },
    lastUpdateDate: {
        type: Date,
    },
});

export const FolderSchema = mongoose.model<IFolder>("Folder", folderSchema);
