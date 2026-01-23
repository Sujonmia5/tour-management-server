import { Router } from "express";
import { PaymentController } from "./payment.controller";

const route: Router = Router();

route.post("/", PaymentController.createPayment);
route.get("/", PaymentController.getAllPayments);

export const PaymentRoute = route;
