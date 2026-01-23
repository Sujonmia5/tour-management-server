import express, { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
// import { TourRoute } from "../modules/tour/tour.route";
// import { PaymentRoute } from "../modules/payment/payment.route";
// import { BookingRoute } from "../modules/booking/booking.route";
// import { AuthRoute } from "../modules/auth/auth.route";

interface IRoute {
  path: string;
  route: Router;
}

export const ApiRouter = express.Router();

const moduleRoutes: IRoute[] = [
  // {
  //   path: "/auth",
  //   route: AuthRoute,
  // },
  {
    path: "/users",
    route: UserRoute,
  },
  // {
  //   path: "/tours",
  //   route: TourRoute,
  // },
  // {
  //   path: "/payments",
  //   route: PaymentRoute,
  // },
  // {
  //   path: "/bookings",
  //   route: BookingRoute,
  // },
];

moduleRoutes.forEach(({ path, route }) => {
  ApiRouter.use(path, route);
});
