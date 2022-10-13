import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
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
    unique: true,
  },
});

export const NoteSchema = mongoose.model("Note", noteSchema);
