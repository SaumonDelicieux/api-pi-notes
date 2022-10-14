import mongoose from "mongoose";

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
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ["Publié", "Archivé", "Brouillant"],
  },
  creationDate: {
    type: String,
  },
  lastUpdateDate: {
    type: String,
  },
});

export const NoteSchema = mongoose.model("Note", noteSchema);
