"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
var express_1 = __importDefault(require("express"));
var note_controller_1 = require("../controllers/note.controller");
exports.noteRouter = express_1.default.Router();
exports.noteRouter.post("/notes/createNote", note_controller_1.createNote);
exports.noteRouter.get("/notes/getAll", note_controller_1.getNotes);
exports.noteRouter.get("/notes/getById", note_controller_1.getNote);
exports.noteRouter.delete("/notes/deleteNote", note_controller_1.deleteNote);
