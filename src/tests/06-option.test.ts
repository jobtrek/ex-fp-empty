import { describe, expect, test } from "bun:test";
import {
  flatMapOption,
  fromNullable,
  getDatabasePort,
  getOrElse,
  mapOption,
  none,
  some,
  type Config,
  type Option,
} from "../06-option";

describe("Exercise 6.1 — some / none", () => {
  test("some wraps a value", () => {
    const s = some(42);
    expect(s._tag).toBe("Some");
    expect(s.value).toBe(42);
  });

  test("some works with strings", () => {
    const s = some("hello");
    expect(s.value).toBe("hello");
  });

  test("none has _tag None", () => {
    expect(none._tag).toBe("None");
  });

  test("none has no value property", () => {
    expect("value" in none).toBe(false);
  });
});

describe("Exercise 6.2 — fromNullable", () => {
  test("wraps a present value in Some", () => {
    expect(fromNullable(42)).toEqual(some(42));
  });

  test("null → None", () => {
    expect(fromNullable(null)).toEqual(none);
  });

  test("undefined → None", () => {
    expect(fromNullable(undefined)).toEqual(none);
  });

  test("zero and empty string are Some (falsy but not null/undefined)", () => {
    expect(fromNullable(0)).toEqual(some(0));
    expect(fromNullable("")).toEqual(some(""));
  });
});

describe("Exercise 6.3 — mapOption", () => {
  test("applies fn to Some value", () => {
    expect(mapOption(some(5), (x) => x * 2)).toEqual(some(10));
  });

  test("leaves None unchanged", () => {
    expect(mapOption(none, (x: number) => x * 2)).toEqual(none);
  });

  test("can change the type", () => {
    expect(mapOption(some(3), (n) => `${n} items`)).toEqual(some("3 items"));
  });
});

describe("Exercise 6.3 — flatMapOption", () => {
  // safeInverse returns None when the input is 0, Some(1/n) otherwise
  const safeInverse = (n: number): Option<number> => (n === 0 ? none : some(1 / n));

  test("applies fn and flattens Some result", () => {
    expect(flatMapOption(some(4), safeInverse)).toEqual(some(0.25));
  });

  test("fn returning None gives None (division by zero)", () => {
    expect(flatMapOption(some(0), safeInverse)).toEqual(none);
  });

  test("None input always returns None", () => {
    expect(flatMapOption(none, safeInverse)).toEqual(none);
  });
});

describe("Exercise 6.4 — getOrElse", () => {
  test("extracts value from Some", () => {
    expect(getOrElse(some(42), 0)).toBe(42);
  });

  test("returns default for None", () => {
    expect(getOrElse(none, 0)).toBe(0);
  });

  test("works with strings", () => {
    expect(getOrElse(some("hello"), "default")).toBe("hello");
    expect(getOrElse<string>(none, "default")).toBe("default");
  });
});

describe("Exercise 6.5 — getDatabasePort", () => {
  test("returns Some when all fields are present", () => {
    const config: Config = { database: { host: "localhost", port: 5432 } };
    expect(getDatabasePort(config)).toEqual(some(5432));
  });

  test("returns None when database is absent", () => {
    const config: Config = {};
    expect(getDatabasePort(config)).toEqual(none);
  });

  test("returns None when port is absent", () => {
    const config: Config = { database: { host: "localhost" } };
    expect(getDatabasePort(config)).toEqual(none);
  });

  test("returns None when database is fully absent", () => {
    const config: Config = { database: undefined };
    expect(getDatabasePort(config)).toEqual(none);
  });
});
