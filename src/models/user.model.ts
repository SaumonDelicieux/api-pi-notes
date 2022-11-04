import mongoose from "mongoose";
import { IUser } from "../types";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: false,
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
        required: false,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    creationDate: {
        type: Date,
    },
    endOfsubscription: {
        type: Date,
    },
    lastUpdateDate: {
        type: Date,
    },
});

export const UserSchema = mongoose.model<IUser>("User", userSchema);
