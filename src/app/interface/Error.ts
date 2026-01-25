export interface IErrorSource {
  path: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorSource?: IErrorSource[];
}
