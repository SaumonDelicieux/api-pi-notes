export interface IToken extends mongoose.Document {
    userId: boolean;
    token: string;
  }