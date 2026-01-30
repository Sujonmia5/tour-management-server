import { Response } from "express";
import { config } from "../config/config";
export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

export const setCookies = (res: Response, token: IToken) => {
  if (!res || !token) return;
  if (token.accessToken) {
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 02 days
    });
  }
  if (token.refreshToken) {
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }
};
