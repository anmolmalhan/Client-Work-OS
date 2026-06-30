import { describe, expect, test } from "bun:test";
import { formatMoney, getBalanceAmount, getPaymentStatus } from "./money";

describe("getBalanceAmount", () => {
  test("returns remaining balance", () => {
    expect(getBalanceAmount(199, 100)).toBe(99);
  });

  test("never goes negative when overpaid", () => {
    expect(getBalanceAmount(100, 150)).toBe(0);
  });

  test("rounds to two decimals", () => {
    expect(getBalanceAmount(100.005, 0)).toBe(100.01);
  });
});

describe("getPaymentStatus", () => {
  test("unpaid when nothing paid", () => {
    expect(getPaymentStatus(100, 0)).toBe("unpaid");
  });

  test("partial when some paid", () => {
    expect(getPaymentStatus(100, 40)).toBe("partial");
  });

  test("paid when fully covered", () => {
    expect(getPaymentStatus(100, 100)).toBe("paid");
  });
});

describe("formatMoney", () => {
  test("formats whole rupees without decimals", () => {
    expect(formatMoney(149)).toBe("₹149");
  });

  test("keeps decimals when present", () => {
    expect(formatMoney(149.5)).toBe("₹149.5");
  });
});
