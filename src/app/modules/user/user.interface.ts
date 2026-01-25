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
  passwordChangedAt?: Date;
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
type TAllowedFields = keyof Omit<TUser, "_id" | "password" | "auths">;

// user Methods
export interface IUserModels extends mongoose.Model<TUser> {
  isUserExist(
    email: string,
    isDataNeed?: boolean,
    fields?: TAllowedFields[],
  ): Promise<Pick<TUser, "_id" | "isPasswordSet"> | boolean>;
}
