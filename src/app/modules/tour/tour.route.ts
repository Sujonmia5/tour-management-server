import { Router } from "express";
import { TourController } from "./tour.controller";

const route: Router = Router();

route.post("/", TourController.createTour);
route.get("/", TourController.getAllTours);

export const TourRoute = route;
