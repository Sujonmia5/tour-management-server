import { config } from "../config/config";
import bcrypt from "bcrypt";

export const HashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.PASSWORD_HASH_SALT_NUMBER));
};

export const ComparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
