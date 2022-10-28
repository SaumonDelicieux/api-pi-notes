import express from "express";
import { port, swaggerPassword } from "../configs/index.config";
import { noteRouter, userRouter, folderRouter, checkoutRouter } from "../routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import * as swaggerJson from "../swagger.json";
import schedule from "../schedules";

const app = express();

app.use(function (req, res, next) {
    if (req.originalUrl === "/api/v1/checkout/paymentSuccess") {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(cors());
app.use(
    "/docApi",
    basicAuth({ users: { Admin: `${swaggerPassword}` }, challenge: true }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson),
);
app.use("/api/v1/", [noteRouter, userRouter, folderRouter, checkoutRouter]);

export function start(): void {
    app.listen(port, () => {
        console.log(`App listening on PORT ${port}`);
    });
}
schedule();
