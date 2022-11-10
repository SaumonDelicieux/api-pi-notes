// Server PORT
export const PORT = process.env.PORT!;

// URI Database connexion
export const DB_URI = process.env.DB_URI!;

// Pass for encode JWT
export const JWT_SECRET = process.env.JWT_SECRET!;

// Swagger password
export const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD!;

// Stripe
export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY!;
export const STRIPE_WH_KEY = process.env.STRIPE_WH_KEY!;
export const STRIPE_WH_KEY_LOCAL = process.env.STRIPE_WH_KEY_LOCAL!;

// Mailer
export const SEND_MAIL = process.env.SEND_MAIL!;
export const PASS_MAIL = process.env.PASS_MAIL!;

// Environment
export const MODE = process.env.MODE!;

// URL Front
export const URL_FRONT = process.env.URL_FRONT!;

import swaggerDoc from "../swagger.json";

swaggerDoc.host = process.env.HOST ?? "";
