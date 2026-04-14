import { describe, expect, test } from "bun:test";
import { answers, calculatePriceWith, formatUserAction } from "../01-pure-functions";

describe("Exercise 1.1 — formatUserAction", () => {
  test("formats a basic log line", () => {
    expect(formatUserAction(1, "login", "2024-01-01T00:00:00.000Z")).toBe(
      "[2024-01-01T00:00:00.000Z] User 1: login",
    );
  });

  test("formats with different userId and action", () => {
    expect(formatUserAction(42, "logout", "2024-06-15T12:30:00.000Z")).toBe(
      "[2024-06-15T12:30:00.000Z] User 42: logout",
    );
  });

  test("is deterministic — same inputs always produce same output", () => {
    const ts = "2024-01-01T00:00:00.000Z";
    expect(formatUserAction(1, "click", ts)).toBe(formatUserAction(1, "click", ts));
  });
});

describe("Exercise 1.2 — calculatePriceWith", () => {
  test("applies the given tax rate", () => {
    expect(calculatePriceWith(100, 0.21)).toBe(121);
  });

  test("works with zero tax", () => {
    expect(calculatePriceWith(50, 0)).toBe(50);
  });

  test("different rates produce different results for the same price", () => {
    expect(calculatePriceWith(100, 0.1)).not.toBe(calculatePriceWith(100, 0.2));
  });

  test("is deterministic regardless of external state", () => {
    expect(calculatePriceWith(200, 0.05)).toBe(210);
    expect(calculatePriceWith(200, 0.05)).toBe(210);
  });
});

describe("Exercise 1.3 — pure/impure identification", () => {
  test("answers has exactly 5 entries", () => {
    expect(answers).toHaveLength(5);
  });

  test("correctly identifies each function", () => {
    // double     → pure (deterministic, no side effects)
    // getRandom  → impure (non-deterministic: Math.random)
    // addTwo     → pure
    // record     → impure (mutates external array)
    // clamp      → pure
    expect(answers).toEqual([true, false, true, false, true]);
  });
});
