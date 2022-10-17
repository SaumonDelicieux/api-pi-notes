export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  isPremium?: boolean;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
