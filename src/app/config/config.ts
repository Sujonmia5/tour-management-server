/* eslint-disable no-undef */
import dotevn from "dotenv";
import path from "path";
import { IConfig } from "../types/config";

dotevn.config({ path: path.join(process.cwd(), ".env") });

const loadConfig = (): IConfig => {
  const envVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "EMAIL_SERVICE",
  ];
  envVariables.forEach((variable) => {
    if (!process.env[variable]) {
      console.warn(
        `Warning: ${variable} is not defined in environment variables.`,
      );
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return envVariables.reduce((configObj: any, variable) => {
    configObj[variable] = process.env[variable];
    return configObj;
  }, {} as IConfig);
};

export const config: IConfig = loadConfig();
