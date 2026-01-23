import { Request, Response } from "express";
import { PaymentServices } from "./payment.services";

const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = req.body;
    const result = await PaymentServices.createPaymentIntoDB(payment);
    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error,
    });
  }
};

const getAllPayments = async (req: Request, res: Response) => {
  try {
    const result = await PaymentServices.getAllPaymentsFromDB();
    res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payments",
      error: error,
    });
  }
};

export const PaymentController = {
  createPayment,
  getAllPayments,
};
