import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { HashPassword } from "../../utils/bcrypt";
import { allowedFields } from "./user.constant";
import { CreateAccessToken, CreateRefreshToken } from "../../utils/token";
import AppError from "../../Error/AppError";
import status from "http-status";

const createUserIntoDB = async (payload: TUser) => {
  const userPayload: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    role: "user",
    phone: payload.phone || "",
    address: payload.address || "",
    password: "",
    isPasswordSet: true,
    auths: [
      {
        provider: "local",
        providerId: payload.email as string,
      },
    ],
  };

  if (await UserModel.isUserExist(payload.email)) {
    throw new AppError(status.CONFLICT, "User already exists");
  }

  userPayload.password = await HashPassword(payload.password as string);

  const result = await UserModel.create(userPayload);

  if (!result) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to create user");
  }
  const JwtPayload = {
    userId: result._id,
    email: result.email,
    role: result.role,
  };
  const accessToken = CreateAccessToken(JwtPayload);
  const refreshToken = CreateRefreshToken(JwtPayload);

  return { accessToken, refreshToken };
};

// get user by email
const getUserByEmail = async (email: string) => {
  const result = await UserModel.findOne({ email });
  if (!result) {
    throw new AppError(status.NOT_FOUND, "User does not exist");
  }
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({ isDeleted: false });
  return result;
};

// update user info
const updateUserIntoDB = async (email: string, updateData: Partial<TUser>) => {
  const updateInfo = Object.fromEntries(
    Object.entries(updateData).filter(([key]) => allowedFields.includes(key)),
  );

  const isUserExist = (await UserModel.isUserExist(email, true)) as TUser;
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User does not exist");
  }
  if (!isUserExist.isActive) {
    throw new AppError(status.FORBIDDEN, "User is not active");
  }

  return UserModel.findOneAndUpdate({ email }, updateInfo, {
    runValidators: true,
    new: true,
  });
};

const UserServices = {
  createUserIntoDB,
  getUserByEmail,
  updateUserIntoDB,
  getAllUsersFromDB,
};

export default UserServices;
