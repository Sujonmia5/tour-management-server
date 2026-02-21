import mongoose, { Schema } from "mongoose";
import { TTour } from "./tour.interface";

const tourSchema = new Schema<TTour>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    costFrom: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
    included: [
      {
        type: String,
      },
    ],
    excluded: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    tourPlan: [
      {
        type: String,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

tourSchema.pre("validate", async function () {
  if ((!this.slug && this.slug === "") || this.title) {
    const base = this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    this.slug = base;
  }
});

export const TourModel = mongoose.model<TTour>("Tour", tourSchema);
