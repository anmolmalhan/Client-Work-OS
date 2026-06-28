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

// Parse a 'YYYY-MM-DD' string as a LOCAL calendar date. `new Date('2026-07-24')`
// is parsed as UTC midnight, which shifts to the previous day in timezones
// behind UTC — throwing off the deadline countdown by a day.
function parseLocalDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  return new Date(value);
}

// Whole days from today until the given date (negative once it has passed).
export function daysUntil(value: string) {
  const target = parseLocalDate(value);
  const today = new Date();
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

// Human label for an apply deadline: "Closes today", "2 days left", "Closed".
export function applyDeadlineLabel(value?: string) {
  if (!value) {
    return null;
  }
  const days = daysUntil(value);
  if (days < 0) {
    return { tone: "closed" as const, text: "Closed" };
  }
  if (days === 0) {
    return { tone: "soon" as const, text: "Closes today" };
  }
  if (days <= 5) {
    return { tone: "soon" as const, text: `${days} day${days === 1 ? "" : "s"} left` };
  }
  return { tone: "open" as const, text: `${days} days left` };
}
