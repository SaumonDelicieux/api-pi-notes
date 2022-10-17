"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var express_1 = __importDefault(require("express"));
var index_config_1 = require("../configs/index.config");
var routes_1 = require("../routes");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var express_basic_auth_1 = __importDefault(require("express-basic-auth"));
var swaggerJson = __importStar(require("../swagger.json"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/docApi', (0, express_basic_auth_1.default)({ users: { 'Admin': "".concat(index_config_1.swaggerPassword) }, challenge: true, }), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJson));
app.use("/api/v1/", [routes_1.noteRouter, routes_1.userRouter, routes_1.folderRouter]);
function start() {
    app.listen(index_config_1.port, function () {
        console.log("App listening on PORT ".concat(index_config_1.port));
    });
}
exports.start = start;
