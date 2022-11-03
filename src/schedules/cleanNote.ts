import schedule from "node-schedule";
import { FolderSchema, NoteSchema } from "../models";

export default async () => {
  return schedule.scheduleJob("0 0 * * *", async () => {
    await cleanNotes();
  });
};
export async function cleanNotes() {
  try {
    let camp = 0;
    console.log("[CRON][cleanNotes] Start");
    await NoteSchema.find().then(async (notes) => {
      if (notes) {
        for await (const note of notes) {
          const a = await FolderSchema.findById(note.folderId);
          if (!a) {
            await NoteSchema.deleteOne(note._id).then((delted) => {
              console.log(`${note.title} was deleted`);
              camp++;
            });
          }
        }
      }
    });
    console.log(`${camp} notes was deleted`);
    console.log(`[CRON][cleanNotes] End`);
  } catch (error) {
    console.log(`[CRON][cleanNotes] Error ${error}`);
  }
}
