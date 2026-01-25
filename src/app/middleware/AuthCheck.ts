import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../utils/CatchAsync";
import { TUser, TUserRole } from "../modules/user/user.interface";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { TUserJwtPayload } from "../utils/token";
import { UserModel } from "../modules/user/user.model";
const AuthCheck = (...role: TUserRole[]) => {
  return CatchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // token missing check
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      // verify token
      const decode = jwt.verify(
        token,
        config.JWT_ACCESSTOKEN_SECRET as string,
      ) as TUserJwtPayload;

      // role check
      if (role.length && !role.includes(decode.role as TUserRole)) {
        throw new Error("You are not authorized to access this route");
      }
      // check user existence
      const user = (await UserModel.isUserExist(decode.email, true, [
        "email",
        "isDeleted",
        "passwordChangedAt",
      ])) as TUser;
      if (!user) {
        throw new Error("User does not exist");
      }
      const passwordChangedTime = user.passwordChangedAt
        ? Math.floor(new Date(user.passwordChangedAt).getTime() / 1000)
        : null;

      if (passwordChangedTime && passwordChangedTime > decode.iat!) {
        throw new Error("You have changed your password. Please login again");
      }
      if (user.isDeleted) {
        throw new Error("User is deleted");
      }
      req.user = user;
      next();
    },
  );
};
export default AuthCheck;
