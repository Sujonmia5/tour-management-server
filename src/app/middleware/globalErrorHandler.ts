/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import AppError from "../Error/AppError";
import { ZodError } from "zod";
import ZodValidation from "../Error/ZodValiadtion";
import handleDuplicateFieldError from "../Error/DuplicateFieldError";
import mongooseValiadtionErrorHandler from "../Error/ValidationError";
import castErrorHandler from "../Error/CastError";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _neßßßxt) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorSource = null;
  console.log(err);
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    const zodError = ZodValidation(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSource = zodError.errorSource;
  } else if (err.name === "CastError") {
    const castError = castErrorHandler(err);
    statusCode = castError.statusCode;
    message = castError.message;
    errorSource = castError.errorSource;
  } else if (err.code === 11000) {
    const duplicateFieldError = handleDuplicateFieldError(err);
    statusCode = duplicateFieldError.statusCode;
    message = duplicateFieldError.message;
    errorSource = duplicateFieldError.errorSource;
  } else if (err.name === "ValidationError" && err.errors) {
    const mongooseValidationErrorHandler = mongooseValiadtionErrorHandler(err);
    statusCode = mongooseValidationErrorHandler.statusCode;
    message = mongooseValidationErrorHandler.message;
    errorSource = mongooseValidationErrorHandler.errorSource;
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = null;
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSource,
  });
};

export default globalErrorHandler;
