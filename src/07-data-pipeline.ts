/**
 * Module 7 — Country Data Pipeline
 *
 * This module brings together everything from modules 1–6:
 *   - Pure functions with no side effects
 *   - map, filter, reduce, flatMap on real data
 *   - pipe to compose small helpers into pipelines
 *   - Immutable transformations (no push/sort in place)
 *   - Curried helpers where it simplifies composition
 *
 * Rules:
 *   - No for loops. Use array methods exclusively.
 *   - Each exported function must be pure.
 *   - Compose small, named helpers rather than writing one large expression.
 *   - Do not modify `countries` or any input array.
 *
 * The `countries` array and the `Country` type are provided below.
 * Do not modify them.
 */

import countriesData from "../data/countries.json";
import { pipe } from "./03-composition";

// ---------------------------------------------------------------------------
// Provided — do not modify
// ---------------------------------------------------------------------------

export type Country = {
  name: { common: string; official: string };
  population: number;
  area: number;
  region: string;
  subregion: string;
  languages: Record<string, string>;
  capital: string[];
  flags: { svg: string; png: string; alt?: string };
};

export const countries: Country[] = countriesData as Country[];

// ---------------------------------------------------------------------------
// Exercise 7.1 — Filter by region
// ---------------------------------------------------------------------------

/**
 * Return all countries whose `region` matches the given string (case-sensitive).
 * Example: countriesByRegion("Europe") → [...53 countries]
 */
export function countriesByRegion(region: string): Country[] {
  // TODO: one line — use filter
}

// ---------------------------------------------------------------------------
// Exercise 7.2 — Population density ranking
// ---------------------------------------------------------------------------

export type CountryDensity = { name: string; density: number };

/**
 * Return every country as a { name, density } object where
 * density = population / area, sorted highest to lowest.
 * Exclude countries where area === 0 to avoid division by zero.
 *
 * Hint: filter out zero-area countries first, then map, then sort.
 * Sorting must not mutate the array. Use .slice() before .sort(), or
 * spread into a new array.
 */
export function populationDensityRanking(): CountryDensity[] {
  // TODO: filter → map → sort (non-mutating)
}

// ---------------------------------------------------------------------------
// Exercise 7.3 — Total population per region
// ---------------------------------------------------------------------------

export type RegionPopulation = { region: string; totalPopulation: number };

/**
 * Return the total population for each distinct region, sorted largest first.
 *
 * Hint:
 *   1. Use reduce to build a Record<string, number> grouping population by region.
 *   2. Convert to an array of { region, totalPopulation } with Object.entries + map.
 *   3. Sort descending.
 */
export function populationByRegion(): RegionPopulation[] {
  // TODO: reduce to group, then map + sort
}

// ---------------------------------------------------------------------------
// Exercise 7.4 — Top 10 most spoken languages
// ---------------------------------------------------------------------------

export type LanguageCount = { language: string; count: number };

/**
 * Return the 10 languages that appear in the most countries, sorted
 * most-to-least, as { language, count } objects.
 *
 * Each country has a `languages` object like { fra: "French", ... }.
 * Count the number of countries each language appears in.
 *
 * Hint:
 *   1. flatMap to extract all language names across all countries.
 *   2. reduce to count occurrences.
 *   3. Sort and slice to the top 10.
 */
export function top10Languages(): LanguageCount[] {
  // TODO: flatMap → reduce → sort → slice(0, 10)
}

// ---------------------------------------------------------------------------
// Exercise 7.5 — Compose a country profile label with pipe
// ---------------------------------------------------------------------------

// Provided helpers — do not modify
const extractName = (c: Country): string => c.name.common;
const toMillions = (n: number): number => Math.round(n / 1_000_000);
const formatLabel =
  (label: string) =>
  (value: number): string =>
    `${label}: ${value}M`;

/**
 * Return a formatted population summary for a single country.
 * Example: countryPopulationLabel(france) → "France: 67M"
 *
 * Build this as a pipeline using `pipe` and the helpers above.
 * You will need to thread from Country → name string → population number
 * → millions → formatted label.
 *
 * Note: because the helpers above operate on different types, you cannot
 * use the variadic `pipe<T>` directly. Instead, call pipe2 (from module 3)
 * or compose the steps manually, OR simply write a pure function body that
 * calls the helpers in sequence and returns the result.
 */
export function countryPopulationLabel(country: Country): string {
  // TODO: call the helpers above in the right order and return the label
}

// ---------------------------------------------------------------------------
// Exercise 7.6 — Largest country in each region
// ---------------------------------------------------------------------------

export type RegionLargest = { region: string; country: string; area: number };

/**
 * For each region, find the country with the largest area.
 * Return as { region, country, area } objects sorted alphabetically by region.
 *
 * Hint:
 *   1. reduce to build a Record<string, Country> keeping the largest per region.
 *   2. Convert to array, map to the result shape, sort by region name.
 */
export function largestCountryPerRegion(): RegionLargest[] {
  // TODO: reduce → map → sort
}
