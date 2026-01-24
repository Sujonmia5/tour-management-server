import JWT from "jsonwebtoken";
import { config } from "../config/config";

type JWTPayload = {
  userId: string;
  email: string;
  role: string;
};

export const CreateAccessToken = (payload: JWTPayload): string => {
  return JWT.sign(
    payload,
    config.JWT_ACCESSTOKEN_SECRET as string,
    {
      expiresIn: config.JWT_ACCESSTOKEN_EXPIRES_IN as string,
    } as JWT.SignOptions,
  );
};

export const CreateRefreshToken = (payload: JWTPayload): string => {
  return JWT.sign(
    payload,
    config.JWT_REFRESHTOKEN_SECRET as string,
    {
      expiresIn: config.JWT_REFRESHTOKEN_EXPIRES_IN as string,
    } as JWT.SignOptions,
  );
};
