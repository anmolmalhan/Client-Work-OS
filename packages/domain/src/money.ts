import type { PaymentStatus } from "./types";

export function formatMoney(amount: number) {
  return `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)}`;
}

export function getBalanceAmount(totalAmount: number, paidAmount: number) {
  return Math.max(0, Math.round((totalAmount - paidAmount) * 100) / 100);
}

export function getPaymentStatus(totalAmount: number, paidAmount: number): PaymentStatus {
  if (paidAmount <= 0) {
    return "unpaid";
  }

  if (paidAmount < totalAmount) {
    return "partial";
  }

  return "paid";
}
