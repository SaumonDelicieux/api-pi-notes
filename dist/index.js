"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var server_service_1 = require("./services/server.service");
var mongoose_service_1 = require("./services/mongoose.service");
(0, mongoose_service_1.dbConnect)();
(0, server_service_1.start)();
