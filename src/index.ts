import "dotenv/config";
import { start } from "./services/service.service";
import { dbConnect } from "./services/mongoose.service";

dbConnect();
start();
