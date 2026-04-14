import { describe, expect, test } from "bun:test";
import {
  countries,
  countriesByRegion,
  countryPopulationLabel,
  largestCountryPerRegion,
  populationByRegion,
  populationDensityRanking,
  top10Languages,
} from "../07-data-pipeline";

describe("Exercise 7.1 — countriesByRegion", () => {
  test("Europe has more than 40 countries", () => {
    expect(countriesByRegion("Europe").length).toBeGreaterThan(40);
  });

  test("Europe count matches known dataset value", () => {
    expect(countriesByRegion("Europe")).toHaveLength(53);
  });

  test("Oceania is present and non-empty", () => {
    expect(countriesByRegion("Oceania").length).toBeGreaterThan(0);
  });

  test("all returned countries have the requested region", () => {
    const result = countriesByRegion("Asia");
    expect(result.every((c) => c.region === "Asia")).toBe(true);
  });

  test("unknown region returns empty array", () => {
    expect(countriesByRegion("Atlantis")).toEqual([]);
  });
});

describe("Exercise 7.2 — populationDensityRanking", () => {
  const ranking = populationDensityRanking();

  test("returns all countries with area > 0", () => {
    const withArea = countries.filter((c) => c.area > 0);
    expect(ranking).toHaveLength(withArea.length);
  });

  test("no country with area === 0 appears in the ranking", () => {
    const zeroAreaNames = countries.filter((c) => c.area === 0).map((c) => c.name.common);
    const rankingNames = ranking.map((c) => c.name);
    for (const name of zeroAreaNames) {
      expect(rankingNames).not.toContain(name);
    }
  });

  test("sorted highest density first", () => {
    for (let i = 0; i < ranking.length - 1; i++) {
      expect(ranking[i]!.density).toBeGreaterThanOrEqual(ranking[i + 1]!.density);
    }
  });

  test("Macau is the densest (dataset-specific)", () => {
    expect(ranking[0]!.name).toBe("Macau");
  });

  test("Monaco is in the top 3", () => {
    const top3 = ranking.slice(0, 3).map((c) => c.name);
    expect(top3).toContain("Monaco");
  });
});

describe("Exercise 7.3 — populationByRegion", () => {
  const result = populationByRegion();

  test("Asia has the highest total population", () => {
    expect(result[0]!.region).toBe("Asia");
  });

  test("all regions are present", () => {
    const regions = result.map((r) => r.region);
    expect(regions).toContain("Africa");
    expect(regions).toContain("Americas");
    expect(regions).toContain("Europe");
    expect(regions).toContain("Oceania");
  });

  test("sorted largest first", () => {
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]!.totalPopulation).toBeGreaterThanOrEqual(result[i + 1]!.totalPopulation);
    }
  });

  test("total world population is roughly correct (within 1%)", () => {
    const total = result.reduce((sum, r) => sum + r.totalPopulation, 0);
    // World population ~8 billion; dataset may vary but should be within 1%
    expect(total).toBeGreaterThan(7_800_000_000);
    expect(total).toBeLessThan(9_000_000_000);
  });
});

describe("Exercise 7.4 — top10Languages", () => {
  const result = top10Languages();

  test("returns exactly 10 entries", () => {
    expect(result).toHaveLength(10);
  });

  test("sorted most-to-least", () => {
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]!.count).toBeGreaterThanOrEqual(result[i + 1]!.count);
    }
  });

  test("English is in the top 10", () => {
    expect(result.map((l) => l.language)).toContain("English");
  });

  test("English is the most spoken (most countries)", () => {
    expect(result[0]!.language).toBe("English");
  });

  test("French is in the top 10", () => {
    expect(result.map((l) => l.language)).toContain("French");
  });
});

describe("Exercise 7.5 — countryPopulationLabel", () => {
  test("formats France correctly", () => {
    const france = countries.find((c) => c.name.common === "France")!;
    expect(countryPopulationLabel(france)).toMatch(/^France: \d+M$/);
  });

  test("formats Germany correctly", () => {
    const germany = countries.find((c) => c.name.common === "Germany")!;
    expect(countryPopulationLabel(germany)).toMatch(/^Germany: \d+M$/);
  });

  test("output format is '<Name>: <N>M'", () => {
    const country = countries[0]!;
    expect(countryPopulationLabel(country)).toMatch(/^.+: \d+M$/);
  });
});

describe("Exercise 7.6 — largestCountryPerRegion", () => {
  const result = largestCountryPerRegion();

  test("Russia is the largest country in Europe", () => {
    const europe = result.find((r) => r.region === "Europe");
    expect(europe?.country).toBe("Russia");
  });

  test("Canada is the largest country in Americas", () => {
    const americas = result.find((r) => r.region === "Americas");
    expect(americas?.country).toBe("Canada");
  });

  test("result is sorted alphabetically by region", () => {
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]!.region.localeCompare(result[i + 1]!.region)).toBeLessThanOrEqual(0);
    }
  });

  test("every region has exactly one entry", () => {
    const regions = result.map((r) => r.region);
    expect(new Set(regions).size).toBe(regions.length);
  });
});
