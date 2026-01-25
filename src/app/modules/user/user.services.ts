import { TUser, TUserPasswordUpdatePayload } from "./user.interface";
import { UserModel } from "./user.model";
import { ComparePassword, HashPassword } from "../../utils/bcrypt";
import { allowedFields } from "./user.constant";
import { CreateAccessToken, CreateRefreshToken } from "../../utils/token";

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

  if (!payload.password) {
    throw new Error("Password is required");
  }

  if (await UserModel.isUserExist(payload.email)) {
    throw new Error("User already exists");
  }

  userPayload.password = await HashPassword(payload.password as string);

  const result = await UserModel.create(userPayload);

  if (!result) {
    throw new Error("Failed to create user");
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
    throw new Error("User does not exist");
  }
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({ isDeleted: false });
  return result;
};

//when user login then change password
const changeUserPassword = async (
  email: string,
  payload: TUserPasswordUpdatePayload,
) => {
  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  // password set na thakle old password check korbo na
  if (!isUserExist.isPasswordSet) {
    const hashedPassword = HashPassword(payload.newPassword as string);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
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
    !ComparePassword(
      payload.oldPassword as string,
      isUserExist.password as string,
    )
  ) {
    throw new Error("Old password is incorrect");
  }

  const hassPassword = HashPassword(payload.newPassword as string);
  if (!hassPassword) {
    throw new Error("Failed to hash password");
  }
  const result = await UserModel.findByIdAndUpdate(isUserExist._id, {
    password: hassPassword,
    passwordChangedAt: new Date(),
    isPasswordChanged: true,
    isPasswordSet: true,
  });
  if (!result) {
    throw new Error("Failed to change password");
  }
  return null;
};
// update user info
const updateUserIntoDB = async (email: string, updateData: Partial<TUser>) => {
  const updateInfo = Object.fromEntries(
    Object.entries(updateData).filter(([key]) => allowedFields.includes(key)),
  );

  const isUserExist = (await UserModel.isUserExist(email, true)) as TUser;
  if (!isUserExist) {
    throw new Error("User does not exist");
  }
  if (!isUserExist.isActive) {
    throw new Error("User is not active");
  }

  return UserModel.findOneAndUpdate({ email }, updateInfo, {
    runValidators: true,
    new: true,
  });
};

const UserServices = {
  createUserIntoDB,
  getUserByEmail,
  changeUserPassword,
  updateUserIntoDB,
  getAllUsersFromDB,
};

export default UserServices;
