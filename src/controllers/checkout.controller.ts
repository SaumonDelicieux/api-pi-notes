import { Request, Response } from "express";
import jwtDecode from "jwt-decode";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

import { UserSchema } from "../models";

import { jwtSecret, StripePrivateKey, WebhooksKey } from "../configs/index.config";

const TITLE_PRODUCT = "Pi'Note | Premium";
const DESCRIPTION_PRODUCT = "Possibilité de partager une note avec d'autres collaborateurs";
const PREMIUM_PRICE = 3000; // 30.00€

const stripeClient = new Stripe(StripePrivateKey!, {
    apiVersion: "2022-08-01",
});

const initiateStripeSession = async (req: Request) => {
    const subscriptionData = [
        {
            price_data: {
                currency: "eur",
                product_data: {
                    name: TITLE_PRODUCT,
                    description: DESCRIPTION_PRODUCT,
                },
                unit_amount: PREMIUM_PRICE,
            },
            quantity: 1,
        },
    ];

    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: subscriptionData,
        payment_intent_data: {
            metadata: {
                userId: req.body.userId,
                subscriptionData: PREMIUM_PRICE,
            },
        },
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
    });

    return session;
};

export const createSession = async (req: Request, res: Response) => {
    try {
        const session = await initiateStripeSession(req);

        res.status(200).json({
            id: session.id,
            price: session.amount_total,
            currency: session.currency,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    const { id }: any = req.headers["authorization"] && jwtDecode(req.headers["authorization"]);

    try {
        const user = await UserSchema.findById(id);

        if (user?.isPremium) {
            console.log("Succceessssssss");

            const token = jwt.sign(
                {
                    id: user._id,
                    isPremium: user.isPremium,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                jwtSecret as string,
                {
                    expiresIn: "30d",
                    algorithm: "HS256",
                },
            );

            return res.status(200).json({
                success: true,
                message: "Paiement validé avec succes",
                token,
            });
        } else {
            console.log("User not premium");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const paymentSuccess = async (req: Request, res: Response) => {
    let data;
    let eventType;

    const sig = req.headers["stripe-signature"] as string;

    if (WebhooksKey && sig) {
        let event;

        try {
            event = await stripeClient.webhooks.constructEventAsync(req.body, sig, WebhooksKey);
        } catch (err) {
            console.log({ err });
            return res.status(400).send(`Webhook Error`);
        }

        data = event.data;
        eventType = event.type;
    } else {
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case "payment_intent.succeeded":
            try {
                const user = await UserSchema.findByIdAndUpdate(data.object.metadata.userId, {
                    isPremium: true,
                });

                console.log({ user });
            } catch (error) {
                console.log(error);
            }
            break;
        default:
            console.log(`Unhandled event type ${eventType}`);
    }

    res.send();
};
