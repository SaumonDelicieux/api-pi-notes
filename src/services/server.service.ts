import express from "express";
import { port, swaggerPassword } from "../configs/index.config";
import { noteRouter, userRouter, folderRouter, commonRouter } from "../routes";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import * as swaggerJson from "../swagger.json";
import schedule from "../schedules";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  "/docApi",
  basicAuth({ users: { Admin: `${swaggerPassword}` }, challenge: true }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson)
);
app.use("/api/v1/", [noteRouter, userRouter, folderRouter, commonRouter]);
export function start(): void {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
}
schedule();
