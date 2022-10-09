import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
  dateOfInscription: {
    type: String,
  },
  lastUpdateDate: {
    type: String,
  },
});

export const UserSchema = mongoose.model("User", userSchema);
