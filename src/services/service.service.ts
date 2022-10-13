import { port } from "../configs/index.config";
import { notesRouter } from "../routes/notes.route";
import { usersRouter } from "../routes/users.route";
import { foldersRouter } from "../routes/folder.route";
import cors from "cors";

const bodyParser = require("body-parser");

const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/", [notesRouter, usersRouter, foldersRouter]);

export function start(): void {
  app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
  });
}
