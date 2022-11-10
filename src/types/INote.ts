import mongoose from "mongoose";

export interface INote extends mongoose.Document {
    folderId: string;
    userId: string;
    title: string;
    text: string;
    state: string;
    sharedWith: Array<string>;
    creationDate: Date;
    lastUpdateDate: Date;
}
