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
  isPasswordChanged: boolean;
  isPasswordSet: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};
