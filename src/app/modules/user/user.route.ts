import { Router } from "express";
import UserContrller from "./user.controller";

const route: Router = Router();

route.post("/create-user", UserContrller.createUser);

export const UserRoute = route;
