import mongoose from "mongoose";

export interface IFolders extends mongoose.Document {
    id: string;
    title: string;
    parentId?: string;
    userId: string;
}
