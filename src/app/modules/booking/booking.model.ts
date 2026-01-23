import mongoose, { Schema } from "mongoose";
import { BOOKING_STATUS } from "./booking.constant";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    userId: { type: String, required: true },
    tourId: { type: String, required: true },
    numberOfParticipants: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    bookingDate: { type: String, required: true },
    specialRequests: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BookingModel = mongoose.model<TBooking>("Booking", bookingSchema);
