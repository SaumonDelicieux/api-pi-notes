import "dotenv/config";
import { start } from "./services/server.service";
import { dbConnect } from "./services/mongoose.service";

dbConnect();
start();
