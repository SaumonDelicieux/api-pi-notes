import express from "express";

import { createSession, paymentSuccess, verifyPayment } from "../controllers/checkout.controller";

import { verifyToken } from "../helpers/verifyToken";

export const checkoutRouter = express.Router();

checkoutRouter.post("/checkout/createSession", verifyToken, createSession);
checkoutRouter.get("/checkout/verifyPayment", verifyToken, verifyPayment);

// Webhooks
checkoutRouter.post(
    "/checkout/paymentSuccess",
    express.raw({ type: "application/json" }),
    paymentSuccess,
);
