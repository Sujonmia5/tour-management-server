import { TTour } from "./tour.interface";
import { TourModel } from "./tour.model";

const createTourIntoDB = async (tour: TTour) => {
  const result = await TourModel.create(tour);
  return result;
};

const getAllToursFromDB = async () => {
  const result = await TourModel.find({ isDeleted: false });
  return result;
};

export const TourServices = {
  createTourIntoDB,
  getAllToursFromDB,
};
