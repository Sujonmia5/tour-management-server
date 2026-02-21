import status from "http-status";
import AppError from "../../Error/AppError";
import { TDivision } from "./division.interface";
import { DivisionModel } from "./division.model";

const createDivisionIntoDB = async (division: TDivision) => {
  const isDivisionExist = await DivisionModel.findOne({
    name: { $regex: `^${division.name.trim()}$`, $options: "i" },
  });
  if (isDivisionExist) {
    throw new AppError(status.CONFLICT, "Already Exist this division");
  }

  const result = await DivisionModel.create(division as Partial<TDivision>);
  return result;
};

const getAllDivisionsFromDB = async () => {
  const result = await DivisionModel.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const getDivisionBySlugFromDB = async (slug: string) => {
  const result = await DivisionModel.findOne({ slug, isDeleted: false });
  return result;
};

const updateDivisionIntoDB = async (id: string, payload: TDivision) => {
  const allowedFields = ["name", "thumbnail", "description"];
  const updateInfo: Partial<TDivision> = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key)),
  );
  const isDivisionExist = await DivisionModel.findById(id);
  if (!isDivisionExist) {
    throw new AppError(status.NOT_FOUND, "Division is not founded");
  }
  if (isDivisionExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Division is already deleted");
  }
  // if (updateInfo["name"]) {
  //   updateInfo["slug"] = updateInfo["name"]
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s+/g, "-")
  //     .replace(/[^a-z0-9-]/g, "");
  // }

  const result = await DivisionModel.findByIdAndUpdate(id, updateInfo, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteDivisionFromDB = async (id: string) => {
  const isDivisionExist = await DivisionModel.findById(id);
  if (!isDivisionExist) {
    throw new AppError(status.NOT_FOUND, "Division is not founded");
  }
  if (isDivisionExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Division is already deleted");
  }
  await DivisionModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return null;
};

export const DivisionServices = {
  createDivisionIntoDB,
  getAllDivisionsFromDB,
  getDivisionBySlugFromDB,
  updateDivisionIntoDB,
  deleteDivisionFromDB,
};
