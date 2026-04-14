/**
 * Module 2 — Higher-Order Functions & Array Methods
 *
 * A higher-order function (HOF) is a function that either:
 *   - takes another function as an argument, or
 *   - returns a function.
 *
 * JavaScript's built-in array methods `map`, `filter`, and `reduce` are HOFs:
 * they receive a callback (another function) and apply it to each element of the array.
 *
 *   map    — transform every element, same length
 *   filter — keep only elements that pass a test, shorter or equal length
 *   reduce — collapse the array into a single accumulated value
 *
 * In this module you will:
 *   1. Replace imperative loops with these methods.
 *   2. Chain multiple methods into one expression.
 *   3. Re-implement the methods from scratch to understand how they work.
 *   4. Use `flatMap` for nested structures.
 */

// ---------------------------------------------------------------------------
// Exercise 2.1 — Replace loops with map / filter / reduce
// ---------------------------------------------------------------------------

/** Return a new array where every number has been doubled. Use `map`. */
export function doubleAll(numbers: number[]): number[] {
  // TODO: use Array.prototype.map
}

/** Return only the even numbers from the array. Use `filter`. */
export function keepEven(numbers: number[]): number[] {
  // TODO: use Array.prototype.filter
}

/** Return the sum of all numbers in the array. Use `reduce`. */
export function sumAll(numbers: number[]): number {
  // TODO: use Array.prototype.reduce
}

// ---------------------------------------------------------------------------
// Exercise 2.2 — Chain operations (single expression)
//
// Write the body as ONE chained expression, no intermediate `const` or `let`.
// ---------------------------------------------------------------------------

/**
 * Given an array of words, return the total character count of words that
 * start with an uppercase letter.
 *
 * Example: ["Hello", "world", "TypeScript"] → 15
 *   ("Hello" = 5 chars, "TypeScript" = 10 chars, "world" is lowercase → skip)
 */
export function uppercaseCharCount(words: string[]): number {
  // TODO: one chained expression, no intermediate variables
}

// ---------------------------------------------------------------------------
// Exercise 2.3 — Implement map, filter, and reduce from scratch
//
// Build generic versions that behave exactly like the built-ins, but without
// using Array.prototype.map / .filter / .reduce internally.
// You may use a for-of loop inside these implementations only.
// ---------------------------------------------------------------------------

/** Transforms every element of `array` using `fn`. */
export function myMap<A, B>(array: A[], fn: (item: A) => B): B[] {
  // TODO: implement without using array.map
}

/** Returns a new array containing only elements for which `predicate` returns true. */
export function myFilter<A>(array: A[], predicate: (item: A) => boolean): A[] {
  // TODO: implement without using array.filter
}

/**
 * Reduces `array` to a single value by repeatedly applying `fn`.
 * `fn` receives the current accumulator and the current item.
 * `initial` is the starting value of the accumulator.
 */
export function myReduce<A, B>(array: A[], fn: (acc: B, item: A) => B, initial: B): B {
  // TODO: implement without using array.reduce
}

// ---------------------------------------------------------------------------
// Exercise 2.4 — flatMap and nested data
// ---------------------------------------------------------------------------

export type Student = { name: string; grades: number[] };

/**
 * Return the flat list of all grades across all students.
 * Hint: flatMap can both map and flatten in one step.
 */
export function allGrades(students: Student[]): number[] {
  // TODO: use flatMap
}

/**
 * Return only the passing grades (>= 4.0) across all students.
 * Hint: combine flatMap and filter (or chain them).
 */
export function passingGrades(students: Student[]): number[] {
  // TODO: combine flatMap and filter
}
