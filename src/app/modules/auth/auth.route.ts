import { Router } from "express";
import { AuthController } from "./auth.controller";

const route: Router = Router();

route.post("/register", AuthController.register);
route.post("/login", AuthController.login);
route.post("/refresh-token", AuthController.refreshToken);

export const AuthRoute = route;
