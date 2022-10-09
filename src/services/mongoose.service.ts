import mongoose from "mongoose";
import { db } from "../configs/index.config";

export function dbConnect(): void {
  mongoose
    .connect(db as string)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`couldnt connect to the database, ${err}`);
      process.exit();
    });
}
