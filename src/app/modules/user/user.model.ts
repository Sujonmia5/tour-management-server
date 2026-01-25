/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema } from "mongoose";
import { USER_ROLES } from "./user.constant";
import { IUserModels, TUser } from "./user.interface";

const authsSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);
const userSchema = new Schema<TUser, IUserModels>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    auths: [authsSchema],
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    isPasswordSet: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.statics["isUserExist"] = async function (
  email,
  isDataNeed = false,
  fields = [],
) {
  const user = await this.findOne({ email, isDeleted: { $ne: true } }).select([
    "_id",
    "isPasswordSet",
    ...fields,
  ]);
  if (isDataNeed) {
    return user;
  }
  return user ? true : false;
};

userSchema.pre(/^find/, function (this: mongoose.Query<any, TUser>) {
  this.where({ isDeleted: { $ne: true } });
});

export const UserModel = mongoose.model<TUser, IUserModels>("User", userSchema);
