import { Router } from "express";
import { AuthController } from "./auth.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { LoginZodSchema } from "./auth.validation";

const route: Router = Router();

route.get("/google", AuthController.googleAuth);

// route.get(
//   "/google/callback",
//   AuthController.googleAuthCallback,
// );

route.post("/login", ValidationCheck(LoginZodSchema), AuthController.login);
route.post("/register", AuthController.register);
route.post("/refresh-token", AuthController.refreshToken);

export const AuthRoute = route;
