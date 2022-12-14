import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    isPremium?: boolean;
    endOfsubscription?: Date;
    creationDate?: Date;
    lastUpdateDate?: Date;
}

export interface IUserDetail {
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    isPremium?: boolean;
    endOfsubscription?: Date;
    creationDate?: Date;
    lastUpdateDate?: Date;
}
