import express from "express";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import cors from "cors";

import { PORT, SWAGGER_PASSWORD } from "../configs/constants";

import { rootRouter } from "../routes";

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
    basicAuth({ users: { Admin: SWAGGER_PASSWORD }, challenge: true }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson),
);
app.use("/api/v1/", rootRouter);

export function start(): void {
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT}`);
    });
}

schedule();
