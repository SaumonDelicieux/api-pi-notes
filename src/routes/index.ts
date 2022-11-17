import { noteRouter } from "./note.routes";
import { userRouter } from "./user.routes";
import { folderRouter } from "./folder.routes";
import { checkoutRouter } from "./checkout.routes";
import { commonRouter } from "./common.routes";

export const rootRouter = [noteRouter, userRouter, folderRouter, checkoutRouter, commonRouter];
