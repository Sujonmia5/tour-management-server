import { Request, Response } from "express";
import { TourServices } from "./tour.services";

const createTour = async (req: Request, res: Response) => {
  try {
    const tour = req.body;
    const result = await TourServices.createTourIntoDB(tour);
    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tour",
      error: error,
    });
  }
};

const getAllTours = async (_req: Request, res: Response) => {
  try {
    const result = await TourServices.getAllToursFromDB();
    res.status(200).json({
      success: true,
      message: "Tours retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tours",
      error: error,
    });
  }
};

export const TourController = {
  createTour,
  getAllTours,
};
