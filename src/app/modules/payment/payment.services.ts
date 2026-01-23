import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";

const createPaymentIntoDB = async (payment: TPayment) => {
  const result = await PaymentModel.create(payment);
  return result;
};

const getAllPaymentsFromDB = async () => {
  const result = await PaymentModel.find({ isDeleted: false });
  return result;
};

export const PaymentServices = {
  createPaymentIntoDB,
  getAllPaymentsFromDB,
};
