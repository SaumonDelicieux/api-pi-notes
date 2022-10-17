"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var index_config_1 = require("../configs/index.config");
function dbConnect() {
    mongoose_1.default
        .connect(index_config_1.db)
        .then(function () {
        console.log("Successfully connected to the database");
    })
        .catch(function (err) {
        console.log("couldnt connect to the database, ".concat(err));
        process.exit();
    });
}
exports.dbConnect = dbConnect;
