import mongoose from "mongoose";
import { IToken } from "../types";

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  token: {
    type: String,
    require: true
  },
  createdAt: {
    type: String,
    default: Date.now(),
    expires: 3600
  },
});

export const TokenSchema = mongoose.model<IToken>("Token", tokenSchema);