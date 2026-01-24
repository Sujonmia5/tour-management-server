import { Response } from "express";
import status from "http-status";

type TResponse<T> = {
  data?: T;
  message?: string;
  statusCode?: number;
  success?: boolean;
};
export const SendResponse = <T>(
  res: Response,
  {
    data,
    message = "Request successful",
    statusCode = status.OK,
    success = true,
  }: TResponse<T>,
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
