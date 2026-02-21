import express, { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { TourTypeRoute } from "../modules/tourType/tourType.route";
import { DivisionRoute } from "../modules/division/division.route";
import { TourRoute } from "../modules/tour/tour.route";

interface IRoute {
  path: string;
  route: Router;
}

export const ApiRouter = express.Router();

const moduleRoutes: IRoute[] = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/tour-types",
    route: TourTypeRoute,
  },
  {
    path: "/division",
    route: DivisionRoute,
  },
  {
    path: "/tours",
    route: TourRoute,
  },
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
