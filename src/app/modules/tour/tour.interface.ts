import { Schema } from "mongoose";

export type TTour = {
  _id?: Schema.Types.ObjectId;
  slug: string;
  title: string;
  description: string;
  images?: string[];
  location: string;
  costFrom: number;
  startDate: string | Date;
  endDate: string | Date;
  tourType: Schema.Types.ObjectId;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
