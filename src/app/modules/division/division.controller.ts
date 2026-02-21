import { Request, Response } from "express";
import { DivisionServices } from "./division.services";
import { CatchAsync } from "../../utils/CatchAsync";
import { SendResponse } from "../../utils/sendResponse";
import status from "http-status";

const createDivision = CatchAsync(async (req: Request, res: Response) => {
  const result = await DivisionServices.createDivisionIntoDB(req.body);
  SendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Division created successfully",
    data: result,
  });
});

const getAllDivisions = CatchAsync(async (_req: Request, res: Response) => {
  const result = await DivisionServices.getAllDivisionsFromDB();
  SendResponse(res, {
    success: true,
    message: "Divisions retrieved successfully",
    data: result,
  });
});

const getDivisionBySlug = CatchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await DivisionServices.getDivisionBySlugFromDB(slug as string);
  SendResponse(res, {
    success: true,
    message: "Division retrieved successfully",
    data: result,
  });
});

const updateDivision = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const result = await DivisionServices.updateDivisionIntoDB(id, req.body);
  SendResponse(res, {
    success: true,
    message: "Division retrieved successfully",
    data: result,
  });
});
const deleteDivision = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const result = await DivisionServices.deleteDivisionFromDB(id);
  SendResponse(res, {
    success: true,
    message: "Division retrieved successfully",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getDivisionBySlug,
  updateDivision,
  deleteDivision,
};
