export {};

declare global {
  namespace Express {
    interface Request {
      body: {
        password: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        isPremium: string
      };
    }
  }
}
