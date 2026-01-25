import mongoose from "mongoose";
import { IErrorResponse } from "../interface/Error";

const mongooseValiadtionErrorHandler = (
  error: mongoose.Error.ValidationError,
): IErrorResponse => {
  const errorSources = Object.values(error.errors).map((err) => ({
    path: err.path,
    message: err.message,
  }));

  return {
    statusCode: 400,
    success: false,
    message: "Validation Error",
    errorSource: errorSources,
  };
};

export default mongooseValiadtionErrorHandler;
