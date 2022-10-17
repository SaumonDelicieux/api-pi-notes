"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderRouter = exports.userRouter = exports.noteRouter = void 0;
var note_routes_1 = require("./note.routes");
Object.defineProperty(exports, "noteRouter", { enumerable: true, get: function () { return note_routes_1.noteRouter; } });
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_routes_1.userRouter; } });
var folder_routes_1 = require("./folder.routes");
Object.defineProperty(exports, "folderRouter", { enumerable: true, get: function () { return folder_routes_1.folderRouter; } });
