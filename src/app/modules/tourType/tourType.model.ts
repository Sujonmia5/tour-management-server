import mongoose, { Schema } from "mongoose";
import { TTourType } from "./tourType.interface";

const tourTypeSchema = new Schema<TTourType>(
  {
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TourTypeModel = mongoose.model<TTourType>(
  "TourType",
  tourTypeSchema,
);
