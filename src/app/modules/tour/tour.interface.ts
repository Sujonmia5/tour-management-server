import { TOUR_TYPES, TOUR_STATUS } from "./tour.constant";

export type TTourType = (typeof TOUR_TYPES)[keyof typeof TOUR_TYPES];

export type TTourStatus = (typeof TOUR_STATUS)[keyof typeof TOUR_STATUS];

export type TTour = {
  _id: string;
  title: string;
  description: string;
  type: TTourType;
  price: number;
  duration: number; // in days
  location: string;
  status: TTourStatus;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  images: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
