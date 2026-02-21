import { Router } from "express";
import { TourTypeController } from "./tourType.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { createTourTypeZodSchema } from "./tourType.validation";
import AuthCheck from "../../middleware/AuthCheck";
import { USER_ROLES } from "../user/user.constant";

const route: Router = Router();

route.post(
  "/create",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ValidationCheck(createTourTypeZodSchema),
  TourTypeController.createTourType,
);
route.get("/", TourTypeController.getAllTourTypes);

route.get(
  "/:Id",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  TourTypeController.getTourTypeById,
);
route.patch(
  "/update",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  TourTypeController.updateTourType,
);
route.delete(
  "/:Id",
  AuthCheck(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  TourTypeController.deleteTourType,
);

export const TourTypeRoute = route;
