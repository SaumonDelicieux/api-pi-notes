import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  folderID: {
    type: String,
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
});

export const NoteSchema = mongoose.model("Note", noteSchema);
