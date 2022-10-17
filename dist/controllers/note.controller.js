"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
var models_1 = require("../models");
function createNote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            note = new models_1.NoteSchema({
                folderId: req.body.folderId,
                userId: req.body.userId,
                title: req.body.title,
                creationDate: new Date(),
                lastUpdateDate: new Date(),
            });
            note
                .save()
                .then(function (note) {
                res.status(200).send({
                    success: true,
                    message: "".concat(note.title, " has been added"),
                    note: note,
                });
            })
                .catch(function (err) {
                res.status(500).send({
                    success: false,
                    message: err.message || "Some error occured",
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.createNote = createNote;
function getNotes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (req.query.userId) {
                models_1.NoteSchema.find({ userId: req.query.userId })
                    .then(function (notes) {
                    res.status(200).send({
                        success: true,
                        notes: notes,
                    });
                })
                    .catch(function (err) {
                    res.status(500).send({
                        success: false,
                        message: "Some error occured",
                    });
                });
            }
            else {
                res.status(401).send({
                    success: false,
                    message: "Missing data",
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.getNotes = getNotes;
function getNote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            models_1.NoteSchema.findById(req.query.id)
                .then(function (note) {
                res.status(200).send({
                    success: true,
                    note: note,
                });
            })
                .catch(function (err) {
                if (err.message.includes('for model "Note"')) {
                    res.status(401).send({
                        success: true,
                        message: "Note not found",
                        note: [],
                    });
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                    });
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.getNote = getNote;
function deleteNote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var noteId;
        return __generator(this, function (_a) {
            noteId = req.query.noteId;
            models_1.NoteSchema.findByIdAndRemove(noteId)
                .then(function (data) {
                if (!data) {
                    res.status(404).send({
                        message: "Cannot delete note with id=".concat(noteId, ". Maybe this note was not found !"),
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: "Note was deleted successfully!",
                        noteId: noteId,
                    });
                }
            })
                .catch(function (err) {
                res.status(500).send({
                    message: "Could not delete note with id=" + noteId,
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.deleteNote = deleteNote;
