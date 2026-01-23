import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import {
  TLoginRequest,
  TRegisterRequest,
  TAuthResponse,
} from "./auth.interface";
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "./auth.constant";

const registerUser = async (
  payload: TRegisterRequest,
): Promise<TAuthResponse> => {
  const { name, email, password, phone, address } = payload;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userData: Record<string, any> = {
    name,
    email,
    password: hashedPassword,
    role: "user",
    isDeleted: false,
    isActive: true,
    isVerified: false,
    auths: [{ provider: "local", providerId: email }],
    isPasswordChanged: false,
    isPasswordSet: true,
  };

  if (phone) userData["phone"] = phone;
  if (address) userData["address"] = address;

  const user = await UserModel.create(userData);

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_ACCESS_SECRET as string,
    { expiresIn: JWT_ACCESS_EXPIRES_IN as string },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    JWT_REFRESH_SECRET as string,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN as string,
    },
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async (payload: TLoginRequest): Promise<TAuthResponse> => {
  const { email, password } = payload;

  // Find user
  const user = await UserModel.findOne({ email, isDeleted: false });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  if (!user.password) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_ACCESS_SECRET as string,
    { expiresIn: JWT_ACCESS_EXPIRES_IN as string },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    JWT_REFRESH_SECRET as string,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN as string,
    },
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET as string) as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_ACCESS_SECRET as string,
      { expiresIn: JWT_ACCESS_EXPIRES_IN as string },
    );

    return { accessToken };
  } catch {
    throw new Error("Invalid refresh token");
  }
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
