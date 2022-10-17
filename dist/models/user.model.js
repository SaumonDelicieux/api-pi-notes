"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
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
    lastUpdateDate: {
        type: Date,
    },
});
exports.UserSchema = mongoose_1.default.model("User", userSchema);
