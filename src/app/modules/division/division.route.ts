import { Router } from "express";
import { DivisionController } from "./division.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { createDivisionZodSchema } from "./division.validation";
import AuthCheck from "../../middleware/AuthCheck";
import { USER_ROLES } from "../user/user.constant";

const route: Router = Router();

route.post(
  "/create-division",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ValidationCheck(createDivisionZodSchema),
  DivisionController.createDivision,
);

route.get("/", DivisionController.getAllDivisions);

route.get("/:slug", DivisionController.getDivisionBySlug);

route.patch(
  "/:id",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ValidationCheck(createDivisionZodSchema),
  DivisionController.updateDivision,
);
route.delete(
  "/:id",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  DivisionController.deleteDivision,
);
export const DivisionRoute = route;
