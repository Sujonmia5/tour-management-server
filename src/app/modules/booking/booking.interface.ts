import { BOOKING_STATUS } from "./booking.constant";

export type TBookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export type TBooking = {
  _id: string;
  userId: string;
  tourId: string;
  numberOfParticipants: number;
  totalPrice: number;
  status: TBookingStatus;
  bookingDate: string;
  specialRequests?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
