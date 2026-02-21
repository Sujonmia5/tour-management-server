/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

export type TDivision = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface IDivisionModel extends mongoose.Model<TDivision> {
  isDivisionExist?(
    slug: string,
  ): Promise<Pick<TDivision, "_id" | "name"> | boolean>;
}
