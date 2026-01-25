/* eslint-disable no-undef */
import dotevn from "dotenv";
import path from "path";
import { IConfig } from "../interface/config";

dotevn.config({ path: path.join(process.cwd(), ".env") });

const loadConfig = (): IConfig => {
  const envVariables: string[] = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "PASSWORD_HASH_SALT_NUMBER",
    "SESSION_SECRET",
    "JWT_ACCESSTOKEN_SECRET",
    "JWT_ACCESSTOKEN_EXPIRES_IN",
    "JWT_REFRESHTOKEN_SECRET",
    "JWT_REFRESHTOKEN_EXPIRES_IN",
    "GOOGLE_OAUTH_CLIENT_ID",
    "GOOGLE_OAUTH_CLIENT_SECRET",
    "GOOGLE_OAUTH_CALLBACK_URL",
  ];
  envVariables.forEach((variable) => {
    if (!process.env[variable]) {
      // eslint-disable-next-line no-console
      console.warn(
        `Warning: ${variable} is not defined in environment variables.`,
      );
    }
  });
  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  return envVariables.reduce((configObj: any, variable) => {
    configObj[variable] = process.env[variable];
    return configObj;
  }, {} as IConfig);
};

export const config: IConfig = loadConfig();
