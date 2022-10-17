"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var folderSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        require: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    creationDate: {
        type: Date,
    },
    lastUpdateDate: {
        type: Date,
    },
});
exports.FolderSchema = mongoose_1.default.model("Folder", folderSchema);
