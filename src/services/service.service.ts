import express from "express";
import { port } from "../configs/index.config";
import { noteRouter, userRouter, folderRouter } from "../routes";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/", [noteRouter, userRouter, folderRouter]);

export function start(): void {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
}
