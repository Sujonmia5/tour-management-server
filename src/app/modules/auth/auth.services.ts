import { TUser } from "../user/user.interface";
import { CreateAccessToken, CreateRefreshToken } from "../../utils/token";

// const registerUser = async (
//   payload: TRegisterRequest,
// ): Promise<TAuthResponse> => {
//   const { name, email, password, phone, address } = payload;

//   // Check if user already exists
//   const existingUser = await UserModel.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create user
//   const userData: Record<string, any> = {
//     name,
//     email,
//     password: hashedPassword,
//     role: "user",
//     isDeleted: false,
//     isActive: true,
//     isVerified: false,
//     auths: [{ provider: "local", providerId: email }],
//     isPasswordChanged: false,
//     isPasswordSet: true,
//   };

//   if (phone) userData["phone"] = phone;
//   if (address) userData["address"] = address;

//   const user = await UserModel.create(userData);

//   return {
//     _id: user._id.toString(),
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };
// };

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

// const refreshAccessToken = async (
//   refreshToken: string,
// ): Promise<{ accessToken: string }> => {
//   try {
//     const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET as string) as {
//       userId: string;
//     };

//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const accessToken = jwt.sign(
//       { userId: user._id, email: user.email, role: user.role },
//       JWT_ACCESS_SECRET as string,
//       { expiresIn: JWT_ACCESS_EXPIRES_IN as string },
//     );

//     return { accessToken };
//   } catch {
//     throw new Error("Invalid refresh token");
//   }
// };

export const AuthServices = {
  // registerUser,
  loginUser,
  // refreshAccessToken,
};
