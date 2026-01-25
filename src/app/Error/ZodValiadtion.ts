import { ZodError } from "zod";
import { IErrorResponse, IErrorSource } from "../interface/Error";
import status from "http-status";

/*
{
statusCode: number,
success: boolean,
message: string,
    errorSource:[
    {
        path: string,
        message: string
    }
]
*/

const ZodValidation = (err: ZodError): IErrorResponse => {
  const errorSources: IErrorSource[] = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: status.BAD_REQUEST,
    success: false,
    message: "Validation failed",
    errorSource: errorSources,
  };
};

export default ZodValidation;
