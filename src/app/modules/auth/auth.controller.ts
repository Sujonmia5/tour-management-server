import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
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

const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({
      success: false,
      message,
      error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthServices.refreshAccessToken(refreshToken);
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result,
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
  refreshToken,
};
