import { CastError } from "mongoose";
import { IErrorResponse } from "../interface/Error";

const castErrorHandler = (error: CastError): IErrorResponse => {
  return {
    statusCode: 400,
    success: false,
    message: `Invalid ${error.path}`,
    errorSource: [{ path: error.path, message: `Invalid ${error.path}` }],
  };
};

export default castErrorHandler;
