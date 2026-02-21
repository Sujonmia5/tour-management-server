import status from "http-status";
import AppError from "../../Error/AppError";
import { TTour } from "./tour.interface";
import { TourModel } from "./tour.model";

const createTourIntoDB = async (payload: TTour) => {
  const tourInfo: TTour = { ...payload };
  const isTourExist = await TourModel.find({
    title: payload.title,
  });
  if (isTourExist) {
    throw new AppError(status.CONFLICT, "Tour already Exist");
  }
  const result = await TourModel.create(tourInfo);
  return result;
};

const getAllToursFromDB = async () => {
  const result = await TourModel.find({ isDeleted: false }).populate(
    "tourType",
  );
  return result;
};

export const TourServices = {
  createTourIntoDB,
  getAllToursFromDB,
};
