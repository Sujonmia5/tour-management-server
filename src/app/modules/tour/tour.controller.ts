import { Request, Response } from "express";
import { TourServices } from "./tour.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/sendResponse";

const createTour = CatchAsync(async (req, res) => {
  const tour = req.body;
  const result = await TourServices.createTourIntoDB(tour);
  SendResponse(res, {
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});

const getAllTours = CatchAsync(async (_req: Request, res: Response) => {
  const result = await TourServices.getAllToursFromDB();
  SendResponse(res, {
    success: true,
    message: "Tours retrieved successfully",
    data: result,
  });
});

export const TourController = {
  createTour,
  getAllTours,
};
