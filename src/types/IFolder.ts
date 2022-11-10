import mongoose from "mongoose";

export interface IFolder extends mongoose.Document {
    id: string;
    title: string;
    parentId?: string;
    userId: string;
}
