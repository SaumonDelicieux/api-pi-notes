import schedule from "node-schedule";
import { UserSchema } from "../models";

export default async () => {
    return schedule.scheduleJob("0 22 * * *", async () => {
        try {
            let camp = 0;
            console.log("[CRON][mailExpireSub] Start");
            const user = UserSchema.find({});
            console.log(`${camp} mail was send`);
            console.log(`[CRON][mailExpireSub] End`);
        } catch (error) {
            console.log(`[CRON][mailExpireSub] Error ${error}`);
        }
    });
};
