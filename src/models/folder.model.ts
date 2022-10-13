import mongoose from "mongoose";

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dateOfInscription: {
    type: String,
  },
  lastUpdateDate: {
    type: String,
  },
});

export const FolderSchema = mongoose.model("Folder", folderSchema);
