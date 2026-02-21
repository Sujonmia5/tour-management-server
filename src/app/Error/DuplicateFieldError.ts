import { IErrorResponse } from "../interface/Error";

/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateFieldError = (error: any): IErrorResponse => {
  const field = Object.keys(error.keyValue)[0] as string;
  const value = error.keyValue[field];

  const message = `Duplicate ${field} value: ${value}. Please use another value!`;

  return {
    statusCode: 400,
    success: false,
    message,
    errorSource: [{ path: Object.keys(error.keyValue)[0] as string, message }],
  };
};

export default handleDuplicateFieldError;
