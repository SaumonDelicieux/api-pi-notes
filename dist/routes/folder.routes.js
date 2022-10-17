"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = void 0;
var express_1 = __importDefault(require("express"));
var folder_controller_1 = require("../controllers/folder.controller");
exports.folderRouter = express_1.default.Router();
exports.folderRouter.post("/folders/createFolder", folder_controller_1.createFolder);
exports.folderRouter.get("/folders/getAll", folder_controller_1.getFolders);
exports.folderRouter.delete("/folders/deleteFolder", folder_controller_1.deleteFolder);
