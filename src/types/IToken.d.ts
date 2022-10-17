import mongoose from "mongoose";

export interface IToken extends mongoose.Document {
  userId: boolean;
  token: string;
}
