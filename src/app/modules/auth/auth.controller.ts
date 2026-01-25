/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { AuthServices } from "./auth.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { TUser } from "../user/user.interface";
import passport from "passport";
import { setCookies } from "../../utils/setCookies";

const register = async (_req: Request, res: Response) => {
  try {
    // const result = await AuthServices.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      // data: result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({
      success: false,
      message,
      error,
    });
  }
};
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

//
const refreshToken = async (_req: Request, res: Response) => {
  try {
    // const { refreshToken } = req.body;
    // const result = await AuthServices.refreshAccessToken(refreshToken);
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      // data: result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Token refresh failed";
    res.status(401).json({
      success: false,
      message,
      error,
    });
  }
};

export const AuthController = {
  register,
  login,
  googleAuth,
  refreshToken,
  googleAuthCallback,
};
