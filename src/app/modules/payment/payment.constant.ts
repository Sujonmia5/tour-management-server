const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  PAYPAL: "paypal",
  BANK_TRANSFER: "bank_transfer",
  CASH: "cash",
} as const;

const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export { PAYMENT_METHODS, PAYMENT_STATUS };
