import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { TUser, TUserRole } from "../modules/user/user.interface";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { TUserJwtPayload } from "../utils/token";
import { UserModel } from "../modules/user/user.model";
import AppError from "../Error/AppError";
import status from "http-status";

const refreshCheck = (...role: TUserRole[]) => {
  return CatchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.cookies["refreshToken"];
      if (!token) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Authorization token is missing",
        );
      }
      // verify token
      const decode = jwt.verify(
        token,
        config.JWT_REFRESHTOKEN_SECRET as string,
      ) as TUserJwtPayload;

      // role check
      if (role.length && !role.includes(decode.role as TUserRole)) {
        throw new AppError(
          status.UNAUTHORIZED,
          "You are not authorized to access this route",
        );
      }
      // check user existence
      const user = (await UserModel.isUserExist(decode.email, true, [
        "email",
        "isDeleted",
        "passwordChangedAt",
      ])) as TUser;
      if (!user) {
        throw new AppError(status.NOT_FOUND, "User does not exist");
      }
      const passwordChangedTime = user.passwordChangedAt
        ? Math.floor(new Date(user.passwordChangedAt).getTime() / 1000)
        : null;

      if (passwordChangedTime && passwordChangedTime > decode.iat!) {
        throw new AppError(
          status.FORBIDDEN,
          "You have changed your password. Please login again",
        );
      }
      if (user.isDeleted) {
        throw new AppError(status.NOT_FOUND, "User is deleted");
      }
      req.user = user;
      next();
    },
  );
};
export default refreshCheck;
