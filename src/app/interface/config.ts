export interface IConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  SESSION_SECRET: string;
  PASSWORD_HASH_SALT_NUMBER: number;
  JWT_ACCESSTOKEN_SECRET: string;
  JWT_ACCESSTOKEN_EXPIRES_IN: string;
  JWT_REFRESHTOKEN_SECRET: string;
  JWT_REFRESHTOKEN_EXPIRES_IN: string;
}
