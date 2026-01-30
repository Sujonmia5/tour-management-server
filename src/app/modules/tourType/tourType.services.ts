import status from "http-status";
import AppError from "../../Error/AppError";
import { TourTypeModel } from "./tourType.model";

const createTourTypeIntoDB = async (payload: { name: string }) => {
  const exists = await TourTypeModel.findOne({ name: payload.name });
  if (exists) {
    throw new AppError(status.CONFLICT, "Tour type already exists");
  }
  const result = await TourTypeModel.create({ name: payload.name });
  return result;
};

const getAllTourTypesFromDB = async () => {
  return TourTypeModel.find({ isDeleted: false });
};

const getTourTypeByIdFromDB = async (id: string) => {
  const result = await TourTypeModel.findById(id);
  if (!result || result.isDeleted)
    throw new AppError(status.NOT_FOUND, "Tour type not found");
  return result;
};

const updateTourTypeIntoDB = async (
  id: string,
  updateData: Partial<{ name: string }>,
) => {
  const result = await TourTypeModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!result)
    throw new AppError(status.BAD_REQUEST, "Failed to update tour type");
  return result;
};

const deleteTourTypeFromDB = async (id: string) => {
  const result = await TourTypeModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result)
    throw new AppError(status.BAD_REQUEST, "Failed to delete tour type");
  return null;
};

const TourTypeServices = {
  createTourTypeIntoDB,
  getAllTourTypesFromDB,
  getTourTypeByIdFromDB,
  updateTourTypeIntoDB,
  deleteTourTypeFromDB,
};

export default TourTypeServices;
