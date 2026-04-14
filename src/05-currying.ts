/**
 * Module 5 — Currying and Partial Application
 *
 * A *curried* function takes its arguments one at a time, returning a new
 * function for each argument until all have been provided.
 *
 *   add(2, 3)        — normal 2-argument call
 *   add(2)(3)        — curried: add(2) returns a function, which receives 3
 *
 * *Partial application* means fixing some arguments of a function to produce
 * a more specialised version:
 *
 *   const double = multiply(2)   // multiply is curried; double is specialised
 *   double(5) === 10
 *
 * Why bother? Currying and partial application let you reuse general functions
 * to build specific ones without repeating logic. They also make pipelines
 * cleaner because each step is a unary (single-argument) function.
 *
 * There is a video about currying in brief project ressources if you need
 * help to understand.
 */

// ---------------------------------------------------------------------------
// Exercise 5.1 — Manual currying
// ---------------------------------------------------------------------------

/**
 * Return the sum of two numbers using a curried signature.
 * add(2)(3) should return 5.
 */
export function add(a: number): (b: number) => number {
  // TODO
}

/**
 * Clamp a number to the range [min, max] using a fully curried signature.
 * clamp(0)(100)(42)  → 42
 * clamp(0)(100)(150) → 100
 * clamp(0)(100)(-5)  → 0
 */
export function clamp(min: number): (max: number) => (value: number) => number {
  // TODO
}

// ---------------------------------------------------------------------------
// Exercise 5.2 — Generic curry2 helper
// ---------------------------------------------------------------------------

/**
 * Transform any 2-argument function into its curried equivalent.
 *
 * curry2((a, b) => a + b)(2)(3) === 5
 * curry2((s: string, n: number) => s.repeat(n))("ha")(3) === "hahaha"
 */
export function curry2<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  // TODO
}

// ---------------------------------------------------------------------------
// Exercise 5.3 — Partial application to create specialised functions
//
// The three general functions below are provided in curried form.
// Create the specialised exports by partially applying (calling with only
// the first argument). Do not write new arrow functions — just supply the
// missing argument to each curried function.
// ---------------------------------------------------------------------------

const multiply =
  (a: number) =>
  (b: number): number =>
    a * b;
const startsWith =
  (prefix: string) =>
  (s: string): boolean =>
    s.startsWith(prefix);
const filterArray =
  <T>(predicate: (item: T) => boolean) =>
  (array: T[]): T[] =>
    array.filter(predicate);

/** Multiply a number by 2, partial application of multiply */
// TODO: export const double = multiply(???)

/** Multiply a number by 3 — partial application of multiply */
// TODO: export const triple = multiply(???)

/** Return true if a string starts with "http" — partial application of startsWith */
// TODO: export const startsWithHttp = startsWith(???)

/** Filter an array keeping only strings that start with "http" */
// TODO: export const keepUrls = filterArray(???)  — hint: reuse startsWithHttp
