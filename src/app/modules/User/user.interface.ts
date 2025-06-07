import { Model } from "mongoose";

export interface TUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActive: Date;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser | null>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  }
  