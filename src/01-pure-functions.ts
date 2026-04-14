/**
 * Module 1 — Pure Functions
 *
 * A pure function has two properties:
 *   1. Same input always produces the same output (deterministic).
 *   2. No side effects: it does not read from or write to anything outside
 *      its own scope (no console.log, no mutation of external variables,
 *      no network calls, no random numbers).
 *
 * Pure functions are the building block of functional programming because
 * they are trivially testable and compose safely without hidden surprises.
 */

// ---------------------------------------------------------------------------
// Exercise 1.1 — Remove the side effect
//
// The function below prints to the console instead of returning a value.
// Console output is a side effect: it is not reflected in the return value
// and cannot be captured by a caller.
//
// Rewrite it as a pure function that *returns* the formatted string instead
// of printing it. The timestamp must come in as a parameter so the output
// is deterministic.
// ---------------------------------------------------------------------------

/** Impure example — do not modify */
export function logUserAction(userId: number, action: string): void {
  console.log(`[${new Date().toISOString()}] User ${userId}: ${action}`);
}

/**
 * Return the formatted log line as a string.
 * Expected format: "[<timestamp>] User <userId>: <action>"
 */
export function formatUserAction(userId: number, action: string, timestamp: string): string {
  // TODO: return the formatted message, no console.log allowed
}

// ---------------------------------------------------------------------------
// Exercise 1.2 — Remove the hidden dependency
//
// The function below depends on a variable defined outside its scope.
// If someone changes `taxRate`, the function's output changes even though
// its inputs did not, that breaks determinism.
//
// Fix it by making every dependency explicit as a parameter.
// ---------------------------------------------------------------------------

let taxRate = 0.21;

/** Impure example — do not modify */
export function calculatePrice(basePrice: number): number {
  return basePrice * (1 + taxRate);
}

/**
 * Return the price including tax.
 * Both the base price and the tax rate must come from parameters.
 */
export function calculatePriceWith(basePrice: number, rate: number): number {
  // TODO: compute and return basePrice with rate applied
}

// ---------------------------------------------------------------------------
// Exercise 1.3 — Identify pure vs impure
//
// Read each function below carefully and decide whether it is pure.
// Export an array `answers` where each entry corresponds to one function:
//   true  → the function is pure
//   false → the function is impure
//
// Functions in order: double, getRandom, addTwo, record, clamp
// ---------------------------------------------------------------------------

function double(x: number): number {
  return x * 2;
}
function getRandom(): number {
  return Math.random();
}
function addTwo(a: number, b: number): number {
  return a + b;
}
const _log: string[] = [];
function record(msg: string): void {
  _log.push(msg);
}
function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/**
 * For each function above (in order), set true if pure, false if impure.
 * There are exactly 5 entries.
 */
export const answers: boolean[] = [
  // TODO: fill in true/false for: double, getRandom, addTwo, record, clamp
];
