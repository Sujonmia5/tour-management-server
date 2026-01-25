import JWT, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

export interface TUserJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const CreateAccessToken = (payload: TUserJwtPayload): string => {
  return JWT.sign(
    payload,
    config.JWT_ACCESSTOKEN_SECRET as string,
    {
      expiresIn: config.JWT_ACCESSTOKEN_EXPIRES_IN as string,
    } as JWT.SignOptions,
  );
};

export const CreateRefreshToken = (payload: TUserJwtPayload): string => {
  return JWT.sign(
    payload,
    config.JWT_REFRESHTOKEN_SECRET as string,
    {
      expiresIn: config.JWT_REFRESHTOKEN_EXPIRES_IN as string,
    } as JWT.SignOptions,
  );
};
