import { PAYMENT_METHODS, PAYMENT_STATUS } from "./payment.constant";

export type TPaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export type TPaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export type TPayment = {
  _id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: TPaymentMethod;
  status: TPaymentStatus;
  transactionId?: string;
  paymentDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
