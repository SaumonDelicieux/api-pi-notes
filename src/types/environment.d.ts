declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MODE: "development" | "staging" | "production";
            SENDMAIL: string;
            MIALPASS: string;
            SMTPHOST: string;
            SMTPPORT: string;
            PORT: string;
            PWD: string;
            STRIPE_PRIVATE_KEY: string;
            STRIPE_WH_KEY: string;
            STRIPE_WH_KEY_LOCAL: string;
            DB_URI: string;
            JWT_SECRET: string;
            SWAGGER_PASSWORD: string;
        }
    }
}

export {};
