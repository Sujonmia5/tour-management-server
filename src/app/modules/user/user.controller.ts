import status from "http-status";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/sendResponse";
import UserServices from "./user.services";

const createUser = CatchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  SendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = CatchAsync(async (_req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserByEmail = CatchAsync(async (req, res) => {
  const email = req?.params["email"] as string;
  if (!email) {
    throw new Error("Email is required");
  }
  const result = await UserServices.getUserByEmail(email);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = CatchAsync(async (req, res) => {
  const email = req?.user?.email;
  if (!email) {
    throw new Error("User not authenticated");
  }
  const updateData = req.body;
  const result = await UserServices.updateUserIntoDB(email, updateData);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const changeUserPassword = CatchAsync(async (req, res) => {
  const email = req?.user?.email as string;
  const result = await UserServices.changeUserPassword(email, req.body);
  SendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const UserContrller = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  changeUserPassword,
};
