import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const createBookingIntoDB = async (booking: TBooking) => {
  const result = await BookingModel.create(booking);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find({ isDeleted: false });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
