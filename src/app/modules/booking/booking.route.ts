import { Router } from "express";
import { BookingController } from "./booking.controller";

const route: Router = Router();

route.post("/", BookingController.createBooking);
route.get("/", BookingController.getAllBookings);

export const BookingRoute = route;
