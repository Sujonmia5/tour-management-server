import TourTypeServices from "./tourType.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/sendResponse";

const createTourType = CatchAsync(async (req, res) => {
  const tourType = req.body;
  const result = await TourTypeServices.createTourTypeIntoDB(tourType);
  SendResponse(res, {
    success: true,
    message: "Tour type created successfully",
    data: result,
  });
});

const getAllTourTypes = CatchAsync(async (_req, res) => {
  const result = await TourTypeServices.getAllTourTypesFromDB();
  SendResponse(res, {
    success: true,
    message: "Tour types retrieved successfully",
    data: result,
  });
});

const getTourTypeById = CatchAsync(async (req, res) => {
  const tourId = req.params["Id"] as string;
  const result = await TourTypeServices.getTourTypeByIdFromDB(tourId);
  SendResponse(res, {
    success: true,
    message: "Tour types retrieved successfully",
    data: result,
  });
});

const updateTourType = CatchAsync(async (req, res) => {
  const tourId = req.params["Id"] as string;
  const toutData = req.body;
  const result = await TourTypeServices.updateTourTypeIntoDB(tourId, toutData);
  SendResponse(res, {
    success: true,
    message: "Tour type retrieved successfully",
    data: result,
  });
});
const deleteTourType = CatchAsync(async (req, res) => {
  const tourId = req.params["Id"] as string;
  const result = await TourTypeServices.deleteTourTypeFromDB(tourId);
  SendResponse(res, {
    success: true,
    message: "Tour type retrieved successfully",
    data: result,
  });
});

export const TourTypeController = {
  createTourType,
  getAllTourTypes,
  getTourTypeById,
  updateTourType,
  deleteTourType,
};
