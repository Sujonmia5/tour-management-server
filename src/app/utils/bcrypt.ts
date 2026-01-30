import { config } from "../config/config";
import bcrypt from "bcrypt";

export const HashPassword = (password: string) => {
  return bcrypt.hash(password, Number(config.PASSWORD_HASH_SALT_NUMBER));
};

export const ComparePassword = (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
