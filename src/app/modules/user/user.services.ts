import { config } from "../../config/config";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";

const createUserDB = async (payload: TUser) => {
  const userPayload: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    role: "user",
    phone: payload.phone || "",
    address: payload.address || "",
    password: "",
  };
  const isUserExist = await UserModel.findOne({
    email: userPayload.email as string,
  });
  if (isUserExist) {
    throw new Error("User already exists");
  }
  const hassPassword = bcrypt.hashSync(
    payload.password as string,
    Number(config.PASSWORD_HASH_SALT_NUMBER),
  );
  userPayload.password = hassPassword;

  return UserModel.create(userPayload);
};

const UserServices = {
  createUserDB,
};

export default UserServices;
