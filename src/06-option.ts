/**
 * Module 6 — Option Type
 *
 * In many languages, functions that might not return a value use `null` or
 * `undefined`. This is convenient but dangerous: the caller must remember to
 * check before using the value, and forgetting causes runtime crashes.
 *
 * The `Option<T>` type makes absence *explicit in the type system*. A function
 * that returns `Option<T>` forces the caller to handle both cases (`Some`
 * (value is present) and `None` (value is absent)), before they can use the
 * result.
 *
 * This is a simplified version of the `Maybe`/`Option` monad found in Haskell,
 * Rust (`Option<T>`), Java (`Optional<T>`) and TypeScript libraries like fp-ts and Effect.
 *
 *   Some<T>  — wraps a value of type T
 *   None     — represents the absence of a value
 *   Option<T> = Some<T> | None   (a discriminated union)
 *
 * The `_tag` field acts as the discriminant: TypeScript narrows the type in
 * an `if` block just by checking `option._tag === 'Some'`.
 */

// ---------------------------------------------------------------------------
// Exercise 6.1 — Define the type and its constructors
// ---------------------------------------------------------------------------

export type Some<T> = { readonly _tag: "Some"; readonly value: T };
export type None = { readonly _tag: "None" };
export type Option<T> = Some<T> | None;

/**
 * Wrap a value in Some.
 * some(42) → { _tag: 'Some', value: 42 }
 */
export function some<T>(value: T): Some<T> {
  // TODO
}

/**
 * The singleton None value.
 * none → { _tag: 'None' }
 */
// TODO: export const none: None = ???

// ---------------------------------------------------------------------------
// Exercise 6.2 — fromNullable
// ---------------------------------------------------------------------------

/**
 * Convert a nullable value into an Option.
 * If the value is null or undefined, return None; otherwise return Some.
 *
 * fromNullable(42)        → Some(42)
 * fromNullable(null)      → None
 * fromNullable(undefined) → None
 */
export function fromNullable<T>(value: T | null | undefined): Option<T> {
  // TODO
}

// ---------------------------------------------------------------------------
// Exercise 6.3 — map and flatMap
// ---------------------------------------------------------------------------

/**
 * Apply `fn` to the value inside Some, leaving None unchanged.
 * This is equivalent to Array.map but for an Option.
 *
 * mapOption(some(5), x => x * 2)  → Some(10)
 * mapOption(none,    x => x * 2)  → None
 */
export function mapOption<A, B>(option: Option<A>, fn: (a: A) => B): Option<B> {
  // TODO: use a discriminated union check (_tag === 'Some')
}

/**
 * Apply `fn` which itself returns an Option, flattening the result.
 * Avoids nested Option<Option<T>>.
 *
 * flatMapOption(some(4), x => x > 0 ? some(x) : none) → Some(4)
 * flatMapOption(none,    x => some(x))                 → None
 */
export function flatMapOption<A, B>(option: Option<A>, fn: (a: A) => Option<B>): Option<B> {
  // TODO
}

// ---------------------------------------------------------------------------
// Exercise 6.4 — getOrElse
// ---------------------------------------------------------------------------

/**
 * Extract the value from Some, or return `defaultValue` if the Option is None.
 *
 * getOrElse(some(42), 0) → 42
 * getOrElse(none,     0) → 0
 */
export function getOrElse<T>(option: Option<T>, defaultValue: T): T {
  // TODO
}

// ---------------------------------------------------------------------------
// Exercise 6.5 — Safe config access
//
// Use the combinators you built above to navigate a nested, possibly-absent
// config object. No null checks, no `?.` operator, use fromNullable and
// flatMapOption.
// ---------------------------------------------------------------------------

export type Config = {
  readonly database?: {
    readonly host?: string;
    readonly port?: number;
  };
};

/**
 * Return the database port wrapped in Option<number>.
 * Return None if Config, Config.database, or Config.database.port is absent.
 *
 * Hint: chain fromNullable with flatMapOption.
 */
export function getDatabasePort(config: Config): Option<number> {
  // TODO: use fromNullable and flatMapOption, no ?. or null checks
}
