import { Router } from "express";
import { UserContrller } from "./user.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { createUserZodSchema } from "./user.validation";
import AuthCheck from "../../middleware/AuthCheck";
import { USER_ROLES } from "./user.constant";

const route: Router = Router();

route.post(
  "/create-user",
  ValidationCheck(createUserZodSchema),
  UserContrller.createUser,
);

route.post(
  "/create-guide",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ValidationCheck(createUserZodSchema),
  UserContrller.createUser,
);

route.get(
  "/",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  UserContrller.getAllUsers,
);
route.patch(
  "/update-user",
  AuthCheck(...Object.values(USER_ROLES)),
  UserContrller.updateUser,
);

route.get(
  "/:email",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.GUIDE),
  UserContrller.getUserByEmail,
);

export const UserRoute = route;
