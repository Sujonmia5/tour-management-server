import { Router } from "express";
import { AuthController } from "./auth.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { LoginZodSchema } from "./auth.validation";
import AuthCheck from "../../middleware/AuthCheck";
import { USER_ROLES } from "../user/user.constant";
import refreshCheck from "../../middleware/refreshTokenCheck";

const route: Router = Router();

route.get("/google", AuthController.googleAuth);

route.get("/google/callback", AuthController.googleAuthCallback);

route.post("/login", ValidationCheck(LoginZodSchema), AuthController.login);
// auth checking must be need
route.post(
  "/reset-password",
  AuthCheck(...Object.values(USER_ROLES)),
  AuthController.changeUserPassword,
);

route.post(
  "/refresh-token",
  refreshCheck(...Object.values(USER_ROLES)),
  AuthController.refreshToken,
);

export const AuthRoute = route;
