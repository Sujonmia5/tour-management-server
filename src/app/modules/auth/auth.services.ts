import { TUser, TUserPasswordUpdatePayload } from "../user/user.interface";
import { CreateAccessToken, CreateRefreshToken } from "../../utils/token";
import { UserModel } from "../user/user.model";
import { ComparePassword, HashPassword } from "../../utils/bcrypt";
import AppError from "../../Error/AppError";
import status from "http-status";

const loginUser = async (user: Partial<TUser>) => {
  const tokenPayload = {
    userId: user._id!.toString(),
    email: user.email!,
    role: user.role!,
  };
  const accessToken = CreateAccessToken(tokenPayload);
  const refreshToken = CreateRefreshToken(tokenPayload);
  return {
    accessToken,
    refreshToken,
  };
};

//when user login then change password
const changeUserPassword = async (
  email: string,
  payload: TUserPasswordUpdatePayload,
) => {
  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User does not exist");
  }

  // password set na thakle old password check korbo na
  if (!isUserExist.isPasswordSet) {
    const hashedPassword = await HashPassword(payload.newPassword as string);
    if (!hashedPassword) {
      throw new AppError(status.BAD_REQUEST, "Failed to hash password");
    }
    await UserModel.updateOne(
      { email },
      {
        password: hashedPassword,
        passwordChangedAt: new Date(),
        isPasswordChanged: true,
        isPasswordSet: true,
      },
    );
    return null;
  }

  if (
    !(await ComparePassword(
      payload.oldPassword as string,
      isUserExist.password as string,
    ))
  ) {
    throw new AppError(status.BAD_REQUEST, "Old password is incorrect");
  }

  const hassPassword = HashPassword(payload.newPassword as string);
  if (!hassPassword) {
    throw new AppError(status.BAD_REQUEST, "Failed to hash password");
  }
  const result = await UserModel.findByIdAndUpdate(isUserExist._id, {
    password: hassPassword,
    passwordChangedAt: new Date(),
    isPasswordChanged: true,
    isPasswordSet: true,
  });
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "Failed to change password");
  }
  return null;
};

const refreshAccessToken = async (
  email: string,
): Promise<{ accessToken: string }> => {
  const isUserExist = await UserModel.findOne({ email });

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "user not Founded");
  }
  const JwtPayload = {
    userId: isUserExist._id!.toString(),
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = CreateAccessToken(JwtPayload);
  return { accessToken };
};

export const AuthServices = {
  // registerUser,
  loginUser,
  changeUserPassword,
  refreshAccessToken,
};
