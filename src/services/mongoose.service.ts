import mongoose from "mongoose";

import { DB_URI, MODE } from "../configs/constants";

export function dbConnect() {
    mongoose
        .connect(DB_URI, { dbName: MODE })
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch(err => {
            console.log(`couldnt connect to the database, ${err}`);
            process.exit();
        });
}
