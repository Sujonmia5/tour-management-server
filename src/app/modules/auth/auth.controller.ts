/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { AuthServices } from "./auth.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { TUser } from "../user/user.interface";
import passport from "passport";
import { setCookies } from "../../utils/setCookies";
import { SendResponse } from "../../utils/sendResponse";
import status from "http-status";

//  login controller using passport local strategy
const login = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      { session: false },
      async (err: any, user: Partial<TUser>, _info: any) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: err,
          });
        }
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password",
          });
        }
        const result = await AuthServices.loginUser(user);

        setCookies(res, result);
        return res.status(200).json({
          success: true,
          message: "Login successful",
          data: result,
        });
      },
    )(req, res, next);
  },
);

// login controller using passport google strategy
const googleAuth = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query["redirect"] || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: redirect as string,
    })(req, res, next);
  },
);

// google auth callback controller
const googleAuthCallback = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "google",
      { session: false },
      async (err: any, user: Partial<TUser>, _info: any) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: err,
          });
        }
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Google authentication failed",
          });
        }
        const result = await AuthServices.loginUser(user);

        setCookies(res, result);

        const redirectUrl = req.query["state"] || "/";
        return res.redirect(redirectUrl as string);
      },
    )(req, res, next);
  },
);

const changeUserPassword = CatchAsync(async (req, res) => {
  const email = (req.user as { email: string })?.email;

  const result = await AuthServices.changeUserPassword(email, req.body);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

//
const refreshToken = CatchAsync(async (req: Request, res: Response) => {
  const email = (req.user as { email: string })?.email;

  const result = await AuthServices.refreshAccessToken(email);
  setCookies(res, result);
  SendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Token refreshed successfully",
    data: result,
  });
});

export const AuthController = {
  login,
  googleAuth,
  refreshToken,
  googleAuthCallback,
  changeUserPassword,
};
