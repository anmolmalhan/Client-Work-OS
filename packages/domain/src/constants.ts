export const requestStatuses = [
  "request_received",
  "details_pending",
  "payment_pending",
  "in_progress",
  "submitted",
  "completed",
  "delivered",
  "cancelled",
] as const;

export const paymentStatuses = ["unpaid", "partial", "paid", "refunded"] as const;
export const serviceCategories = ["forms", "documents", "conversion", "status_support", "account_support"] as const;
export const priceTypes = ["fixed", "starting_at", "variable"] as const;
export const urgencyLevels = ["normal", "urgent"] as const;

export const requestStatusLabels = {
  request_received: "Request Received",
  details_pending: "Details Pending",
  payment_pending: "Payment Pending",
  in_progress: "In Progress",
  submitted: "Submitted",
  completed: "Completed",
  delivered: "Delivered",
  cancelled: "Cancelled",
} as const;

export const paymentStatusLabels = {
  unpaid: "Unpaid",
  partial: "Partial",
  paid: "Paid",
  refunded: "Refunded",
} as const;

export const serviceCategoryLabels = {
  forms: "Online Forms",
  documents: "Digital Documents",
  conversion: "File Conversion",
  status_support: "Status Support",
  account_support: "Account Support",
} as const;
