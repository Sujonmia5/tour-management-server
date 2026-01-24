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
    passwordChangeAt: {
      type: Date,
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
  email: string,
  isDataNeed: boolean,
) {
  const user = await this.findOne({ email, isDeleted: { $ne: true } });
  if (isDataNeed) {
    return user;
  }
  return user ? true : false;
};

export const UserModel = mongoose.model<TUser, IUserModels>("User", userSchema);
