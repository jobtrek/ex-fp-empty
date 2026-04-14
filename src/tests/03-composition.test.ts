import { describe, expect, test } from "bun:test";
import { compose, pipe, pipe2, toSlug, toSlugWithPrefix } from "../03-composition";

describe("Exercise 3.1 — pipe2", () => {
  test("applies two functions left-to-right", () => {
    expect(
      pipe2(
        (x: number) => x + 1,
        (x) => x * 2,
      )(3),
    ).toBe(8);
  });
  test("string transformation", () => {
    expect(
      pipe2(
        (s: string) => s.trim(),
        (s) => s.toUpperCase(),
      )("  hello  "),
    ).toBe("HELLO");
  });
});

describe("Exercise 3.1 — pipe (variadic)", () => {
  test("three functions", () => {
    expect(
      pipe(
        (x: number) => x + 1,
        (x) => x * 2,
        (x) => x - 3,
      )(3),
    ).toBe(5);
  });

  test("single function acts as identity", () => {
    expect(pipe((x: number) => x + 1)(3)).toBe(4);
  });

  test("empty pipe returns the value unchanged", () => {
    expect(pipe<number>()(7)).toBe(7);
  });

  test("string pipeline", () => {
    expect(
      pipe(
        (s: string) => s.trim(),
        (s) => s.toLowerCase(),
      )("  HELLO  "),
    ).toBe("hello");
  });
});

describe("Exercise 3.2 — compose", () => {
  test("applies functions right-to-left", () => {
    // compose(f, g)(x) = f(g(x))
    // g = x+1, f = x*2  → result: (3+1)*2 = 8
    expect(
      compose(
        (x: number) => x * 2,
        (x) => x + 1,
      )(3),
    ).toBe(8);
  });

  test("three functions right-to-left", () => {
    // h(g(f(x))) with f=+1, g=*2, h=-3 → compose(h, g, f)(3) = (3+1)*2-3 = 5
    expect(
      compose(
        (x: number) => x - 3,
        (x) => x * 2,
        (x) => x + 1,
      )(3),
    ).toBe(5);
  });

  test("empty compose returns identity", () => {
    expect(compose<number>()(9)).toBe(9);
  });
});

describe("Exercise 3.3 — toSlug", () => {
  test("basic slug", () => {
    expect(toSlug("Hello World")).toBe("hello-world");
  });
  test("trims leading and trailing spaces", () => {
    expect(toSlug("  Hello World  ")).toBe("hello-world");
  });
  test("collapses multiple internal spaces", () => {
    expect(toSlug("  Functional   Programming  ")).toBe("functional-programming");
  });
  test("already lowercase", () => {
    expect(toSlug("bun")).toBe("bun");
  });
});

describe("Exercise 3.3 — toSlugWithPrefix", () => {
  test("adds post- prefix", () => {
    expect(toSlugWithPrefix("  Hello World  ")).toBe("post-hello-world");
  });
  test("single word", () => {
    expect(toSlugWithPrefix("TypeScript")).toBe("post-typescript");
  });
});
