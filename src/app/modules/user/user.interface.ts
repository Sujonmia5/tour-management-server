/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import { USER_ROLES } from "./user.constant";

export type TAuthProvider = "local" | "google";

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: TUserRole;
  phone?: string;
  address?: string;
  isDeleted: boolean;
  isActive: boolean;
  isVerified: boolean;
  auths: [
    {
      provider: TAuthProvider;
      providerId: string;
    },
  ];
  passwordChangeAt?: Date;
  isPasswordChanged: boolean;
  isPasswordSet: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type TUserPasswordUpdatePayload = {
  newPassword: string;
  oldPassword?: string;
};

// user Methods
export interface IUserModels extends mongoose.Model<TUser> {
  isUserExist(
    email: string,
    isDataNeed: boolean,
  ): Promise<Pick<TUser, "_id" | "isPasswordSet"> | boolean>;
}
