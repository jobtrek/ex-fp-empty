import { describe, expect, test } from "bun:test";
import { add, clamp, curry2, double, keepUrls, startsWithHttp, triple } from "../05-currying";

describe("Exercise 5.1 — add (curried)", () => {
  test("add(2)(3) === 5", () => {
    expect(add(2)(3)).toBe(5);
  });
  test("add(0)(0) === 0", () => {
    expect(add(0)(0)).toBe(0);
  });
  test("works with negatives", () => {
    expect(add(-4)(10)).toBe(6);
  });
  test("returns a function after first call", () => {
    expect(typeof add(1)).toBe("function");
  });
});

describe("Exercise 5.1 — clamp (curried)", () => {
  test("value within range is unchanged", () => {
    expect(clamp(0)(100)(42)).toBe(42);
  });
  test("value above max is clamped to max", () => {
    expect(clamp(0)(100)(150)).toBe(100);
  });
  test("value below min is clamped to min", () => {
    expect(clamp(0)(100)(-5)).toBe(0);
  });
  test("value equal to min", () => {
    expect(clamp(10)(50)(10)).toBe(10);
  });
  test("value equal to max", () => {
    expect(clamp(10)(50)(50)).toBe(50);
  });
});

describe("Exercise 5.2 — curry2", () => {
  test("curries addition", () => {
    const curriedAdd = curry2((a: number, b: number) => a + b);
    expect(curriedAdd(3)(4)).toBe(7);
  });

  test("curries string repeat", () => {
    const repeat = curry2((s: string, n: number) => s.repeat(n));
    expect(repeat("ha")(3)).toBe("hahaha");
  });

  test("first call returns a function", () => {
    const f = curry2((a: number, b: number) => a * b);
    expect(typeof f(2)).toBe("function");
  });

  test("works with boolean result", () => {
    const gt = curry2((a: number, b: number) => a > b);
    expect(gt(5)(3)).toBe(true);
    expect(gt(1)(3)).toBe(false);
  });
});

describe("Exercise 5.3 — partial application", () => {
  test("double(5) === 10", () => {
    expect(double(5)).toBe(10);
  });
  test("double(0) === 0", () => {
    expect(double(0)).toBe(0);
  });

  test("triple(4) === 12", () => {
    expect(triple(4)).toBe(12);
  });
  test("triple(0) === 0", () => {
    expect(triple(0)).toBe(0);
  });

  test('startsWithHttp("https://example.com") === true', () => {
    expect(startsWithHttp("https://example.com")).toBe(true);
  });
  test('startsWithHttp("ftp://example.com") === false', () => {
    expect(startsWithHttp("ftp://example.com")).toBe(false);
  });

  test("keepUrls filters only http(s) strings", () => {
    const input = ["https://example.com", "not-a-url", "http://bun.sh", "ftp://old.net"];
    expect(keepUrls(input)).toEqual(["https://example.com", "http://bun.sh"]);
  });
  test("keepUrls returns empty for no matches", () => {
    expect(keepUrls(["hello", "world"])).toEqual([]);
  });
});
