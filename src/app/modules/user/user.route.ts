import { Router } from "express";
import { UserContrller } from "./user.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { createUserZodSchema } from "./user.validation";

const route: Router = Router();

route.post(
  "/create-user",
  ValidationCheck(createUserZodSchema),
  UserContrller.createUser,
);
route.get("/", UserContrller.getAllUsers);
route.patch("/update-user", UserContrller.updateUser);
route.patch("/change-user-password", UserContrller.changeUserPassword);
route.get("/:email", UserContrller.getUserByEmail);

export const UserRoute = route;
