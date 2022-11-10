import mongoose from "mongoose";

import { DB_URI } from "../configs/constants";

export function dbConnect() {
    mongoose
        .connect(DB_URI)
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch(err => {
            console.log(`couldnt connect to the database, ${err}`);
            process.exit();
        });
}
