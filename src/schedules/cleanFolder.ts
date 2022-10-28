import schedule from "node-schedule";
import { FolderSchema } from "../models";

export default async () => {
  return schedule.scheduleJob("0 23 * * *", async () => {
    try {
      console.log("[CRON][cleanFolders] Start");
      let camp = 0;
      const nOroot = await FolderSchema.find({ parentId: { $ne: null } }).sort({
        creationDate: 1,
      });
      for await (const folder of nOroot) {
        const parentFolder = await FolderSchema.findById(folder.parentId);
        if (!parentFolder) {
          await FolderSchema.deleteOne(folder._id);
          console.log(`${folder.title} was deleted`);
          camp++;
        }
      }
      console.log(`${camp} Folders was deleted`);
      console.log(`[CRON][cleanFolders] End`);
    } catch (error) {
      console.log(`[CRON][cleanFolders] Error ${error}`);
    }
  });
};
