import { Router } from "express";
import { TourController } from "./tour.controller";
import { ValidationCheck } from "../../middleware/ValidationCheck";
import { createTourZodSchema } from "./tour.validation";

const route: Router = Router();

route.post(
  "/create-tour",
  ValidationCheck(createTourZodSchema),
  TourController.createTour,
);
route.get("/", TourController.getAllTours);

export const TourRoute = route;
