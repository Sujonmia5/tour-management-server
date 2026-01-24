import { config } from "../config/config";
import bcrypt from "bcrypt";

export const HashPassword = (password: string): string => {
  return bcrypt.hashSync(password, Number(config.PASSWORD_HASH_SALT_NUMBER));
};

export const ComparePassword = (
  plainPassword: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
