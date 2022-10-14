import mongoose from "mongoose";
import { IFolders } from "../types";

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
    type: String,
  },
  lastUpdateDate: {
    type: String,
  },
});

export const FolderSchema = mongoose.model<IFolders>("Folder", folderSchema);
