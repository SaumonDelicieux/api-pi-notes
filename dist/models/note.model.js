"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var noteSchema = new Schema({
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
    },
    state: {
        type: String,
        enum: ["public", "archived", "junk"],
        default: "junk",
    },
    creationDate: {
        type: Date,
    },
    lastUpdateDate: {
        type: Date,
    },
});
exports.NoteSchema = mongoose_1.default.model("Note", noteSchema);
