/**
 * Module 4 — Immutability
 *
 * In functional programming, data is never modified after it is created.
 * Instead of mutating an object or array, you produce a *new* value that
 * reflects the change.
 *
 * Why? Mutable shared state is a common source of bugs. A function that
 * modifies its input can break any other code that holds a reference to the
 * same object. Pure functions that return new values are safer and easier
 * to reason about.
 *
 * TypeScript's `readonly` modifier enforces this at compile time: the
 * compiler will reject any assignment to a readonly property.
 *
 * Useful patterns:
 *   - Spread for objects:  { ...original, field: newValue }
 *   - Spread for arrays:   [...original, newItem]
 *   - Array methods that return new arrays: slice, filter, map, concat
 */

// ---------------------------------------------------------------------------
// Exercise 4.1 — Update objects without mutation
// ---------------------------------------------------------------------------

export type User = {
  readonly id: number;
  readonly name: string;
  readonly address: {
    readonly city: string;
    readonly country: string;
  };
};

/**
 * Return a new User with `name` changed to `newName`.
 * The original `user` must remain unchanged.
 */
export function rename(user: User, newName: string): User {
  // TODO: spread the original, override the name field
  // --sw-wipe--
  return { ...user, name: newName };
  // --sw-wipe--
}

/**
 * Return a new User with the city in their address changed to `newCity`.
 * The original `user` must remain unchanged.
 * Hint: you need to spread at two levels, the user and the nested address.
 */
export function relocate(user: User, newCity: string): User {
  // TODO: spread the user, then spread the nested address object
  // --sw-wipe--
  return { ...user, address: { ...user.address, city: newCity } };
  // --sw-wipe--
}

// ---------------------------------------------------------------------------
// Exercise 4.2 — Immutable array operations
//
// All three functions must return a *new* array. Never mutate the input.
// The `readonly` modifier on the parameter type enforces this at call sites.
// ---------------------------------------------------------------------------

/** Return a new array with `item` appended at the end. */
export function appendItem<T>(array: readonly T[], item: T): T[] {
  // TODO
  // --sw-wipe--
  return [...array, item];
  // --sw-wipe--
}

/** Return a new array with the element at `index` removed. */
export function removeAt<T>(array: readonly T[], index: number): T[] {
  // TODO: hint, slice is your friend
  // --sw-wipe--
  return [...array.slice(0, index), ...array.slice(index + 1)];
  // --sw-wipe--
}

/** Return a new array where the element at `index` is replaced by `newItem`. */
export function replaceAt<T>(array: readonly T[], index: number, newItem: T): T[] {
  // TODO
  // --sw-wipe--
  return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
  // --sw-wipe--
}

// ---------------------------------------------------------------------------
// Exercise 4.3 — Immutable state (reducer pattern)
//
// This pattern is at the heart of React's `useReducer` and Redux.
// A "reducer" is a pure function: (currentState, action) → newState.
// ---------------------------------------------------------------------------

export type CounterState = {
  readonly value: number;
  readonly history: readonly number[];
};

/**
 * Return a new state where `value` has been incremented by `step`.
 * The previous value must be appended to `history`.
 */
export function increment(state: CounterState, step: number): CounterState {
  // TODO: return a new CounterState, do not mutate state
  // --sw-wipe--
  return {
    value: state.value + step,
    history: [...state.history, state.value],
  };
  // --sw-wipe--
}

/**
 * Return a new state where `value` has been reset to 0.
 * The previous value must be appended to `history`.
 */
export function reset(state: CounterState): CounterState {
  // TODO: return a new CounterState, do not mutate state
  // --sw-wipe--
  return {
    value: 0,
    history: [...state.history, state.value],
  };
  // --sw-wipe--
}
