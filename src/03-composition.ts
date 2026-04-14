/**
 * Module 3 — Function Composition
 *
 * Composition is the practice of building complex transformations by
 * combining small, single-purpose functions.
 *
 *   pipe(f, g, h)(x)    is equivalent to  h(g(f(x)))  — left to right
 *   compose(f, g, h)(x) is equivalent to  f(g(h(x)))  — right to left
 *
 * Think of `pipe` as an assembly line: the value passes through each
 * station from left to right.
 * Think of `compose` as nested function calls written inside out.
 *
 * Both are standard utilities you will find in libraries like fp-ts,
 * Ramda, and Effect. Here you build them yourself.
 */

// ---------------------------------------------------------------------------
// Exercise 3.1 — Implement `pipe`
// ---------------------------------------------------------------------------

/**
 * Warmup: combine exactly two functions left-to-right.
 * pipe2(f, g)(x) === g(f(x))
 */
export function pipe2<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  // TODO
  // --sw-wipe--
  return (a: A) => g(f(a));
  // --sw-wipe--
}

/**
 * Variadic pipe: apply any number of functions left-to-right, all sharing
 * the same type T.
 * pipe(f, g, h)(x) === h(g(f(x)))
 *
 * An empty pipe with no functions should return the identity function.
 * Hint: Array.prototype.reduce works elegantly here.
 */
export function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  // TODO
  // --sw-wipe--
  return (x: T) => fns.reduce((v, fn) => fn(v), x);
  // --sw-wipe--
}

// ---------------------------------------------------------------------------
// Exercise 3.2 — Implement `compose`
// ---------------------------------------------------------------------------

/**
 * Apply functions right-to-left.
 * compose(f, g, h)(x) === f(g(h(x)))
 *
 * Hint: very similar to pipe, one small change makes all the difference.
 */
export function compose<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  // TODO
  // --sw-wipe--
  return (x: T) => fns.reduceRight((v, fn) => fn(v), x);
  // --sw-wipe--
}

// ---------------------------------------------------------------------------
// Exercise 3.3 — Build a text-processing pipeline with pipe
//
// The helper functions below are provided. Your task is to compose them
// using `pipe` to build the two exported constants.
// ---------------------------------------------------------------------------

/** Helpers provided, do not change them */
const trim = (s: string): string => s.trim();
const toLowerCase = (s: string): string => s.toLowerCase();
const removeSpaces = (s: string): string => s.replace(/\s+/g, "-");
const addPrefix =
  (prefix: string) =>
  (s: string): string =>
    `${prefix}${s}`;

/**
 * Convert a raw string into a URL-friendly slug.
 * "  Hello World  " → "hello-world"
 *
 * Build this using `pipe` and the helpers above.
 * Do not call the helpers directly — pass them as arguments to pipe.
 */
export const toSlug: (s: string) => string = pipe(
  // TODO: list the helper functions in the right order
  // --sw-wipe--
  trim,
  toLowerCase,
  removeSpaces,
  // --sw-wipe--
);

/**
 * Same as toSlug, but prepend "post-" to the result.
 * "  Hello World  " → "post-hello-world"
 */
export const toSlugWithPrefix: (s: string) => string = pipe(
  // TODO: list the helper functions including addPrefix("post-")
  // --sw-wipe--
  trim,
  toLowerCase,
  removeSpaces,
  addPrefix("post-"),
  // --sw-wipe--
);
