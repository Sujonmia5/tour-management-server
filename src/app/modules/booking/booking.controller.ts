import { Request, Response } from "express";
import { BookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    const result = await BookingServices.createBookingIntoDB(booking);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.getAllBookingsFromDB();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error,
    });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
};
