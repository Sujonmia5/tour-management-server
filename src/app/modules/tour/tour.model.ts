import mongoose, { Schema } from "mongoose";
import { TOUR_TYPES, TOUR_STATUS } from "./tour.constant";
import { TTour } from "./tour.interface";

const tourSchema = new Schema<TTour>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: Object.values(TOUR_TYPES), required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(TOUR_STATUS),
      default: TOUR_STATUS.ACTIVE,
    },
    maxParticipants: { type: Number, required: true },
    currentParticipants: { type: Number, default: 0 },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    images: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TourModel = mongoose.model<TTour>("Tour", tourSchema);
