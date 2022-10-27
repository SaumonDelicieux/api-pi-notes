import cleanNote from "./cleanNote";
import cleanFolder from "./cleanFolder";

export default () => {
  cleanNote();
  cleanFolder();
  console.log("[CRON] Started");
};
