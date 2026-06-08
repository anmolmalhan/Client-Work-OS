import { formatMoney } from "@wdsc/domain";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function priceText(price?: number, note?: string) {
  if (typeof price === "number") {
    return formatMoney(price);
  }

  return note ?? "Price depends on work";
}
