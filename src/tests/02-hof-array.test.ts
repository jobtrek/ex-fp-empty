import { describe, expect, test } from "bun:test";
import {
  allGrades,
  doubleAll,
  keepEven,
  myFilter,
  myMap,
  myReduce,
  passingGrades,
  sumAll,
  uppercaseCharCount,
  type Student,
} from "../02-hof-array";

describe("Exercise 2.1 — doubleAll", () => {
  test("doubles every element", () => {
    expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6]);
  });
  test("empty array", () => {
    expect(doubleAll([])).toEqual([]);
  });
  test("handles negatives", () => {
    expect(doubleAll([-3, 0, 5])).toEqual([-6, 0, 10]);
  });
});

describe("Exercise 2.1 — keepEven", () => {
  test("keeps only even numbers", () => {
    expect(keepEven([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });
  test("empty array", () => {
    expect(keepEven([])).toEqual([]);
  });
  test("no evens", () => {
    expect(keepEven([1, 3, 5])).toEqual([]);
  });
});

describe("Exercise 2.1 — sumAll", () => {
  test("sums an array of numbers", () => {
    expect(sumAll([1, 2, 3, 4])).toBe(10);
  });
  test("empty array returns 0", () => {
    expect(sumAll([])).toBe(0);
  });
  test("handles negatives", () => {
    expect(sumAll([-1, -2, 3])).toBe(0);
  });
});

describe("Exercise 2.2 — uppercaseCharCount", () => {
  test("counts chars of words starting with uppercase", () => {
    expect(uppercaseCharCount(["Hello", "world", "TypeScript"])).toBe(15);
  });
  test("empty array returns 0", () => {
    expect(uppercaseCharCount([])).toBe(0);
  });
  test("no uppercase words returns 0", () => {
    expect(uppercaseCharCount(["hello", "world"])).toBe(0);
  });
  test("all uppercase words", () => {
    expect(uppercaseCharCount(["Hi", "There"])).toBe(7);
  });
});

describe("Exercise 2.3 — myMap", () => {
  test("matches built-in map behaviour", () => {
    const arr = [1, 2, 3];
    expect(myMap(arr, (x) => x * 2)).toEqual(arr.map((x) => x * 2));
  });
  test("empty array", () => {
    expect(myMap([], (x: number) => x + 1)).toEqual([]);
  });
  test("works with string → number transformation", () => {
    expect(myMap(["a", "bb", "ccc"], (s) => s.length)).toEqual([1, 2, 3]);
  });
});

describe("Exercise 2.3 — myFilter", () => {
  test("matches built-in filter behaviour", () => {
    const arr = [1, 2, 3, 4, 5];
    const pred = (x: number) => x > 2;
    expect(myFilter(arr, pred)).toEqual(arr.filter(pred));
  });
  test("empty array", () => {
    expect(myFilter([], () => true)).toEqual([]);
  });
  test("nothing passes", () => {
    expect(myFilter([1, 2, 3], () => false)).toEqual([]);
  });
});

describe("Exercise 2.3 — myReduce", () => {
  test("matches built-in reduce behaviour (sum)", () => {
    expect(myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0)).toBe(10);
  });
  test("empty array returns initial", () => {
    expect(myReduce([], (acc: number, x: number) => acc + x, 42)).toBe(42);
  });
  test("builds a string", () => {
    expect(myReduce(["a", "b", "c"], (acc, s) => acc + s, "")).toBe("abc");
  });
});

describe("Exercise 2.4 — allGrades", () => {
  const students: Student[] = [
    { name: "Alice", grades: [5, 4, 3] },
    { name: "Bob", grades: [6, 5] },
  ];

  test("returns flat list of all grades", () => {
    expect(allGrades(students)).toEqual([5, 4, 3, 6, 5]);
  });
  test("empty students list", () => {
    expect(allGrades([])).toEqual([]);
  });
  test("student with no grades", () => {
    expect(allGrades([{ name: "Eve", grades: [] }])).toEqual([]);
  });
});

describe("Exercise 2.4 — passingGrades", () => {
  const students: Student[] = [
    { name: "Alice", grades: [5, 3.5, 4] },
    { name: "Bob", grades: [2, 6] },
  ];

  test("keeps only grades >= 4.0", () => {
    expect(passingGrades(students)).toEqual([5, 4, 6]);
  });
  test("no passing grades", () => {
    expect(passingGrades([{ name: "Alice", grades: [1, 2, 3] }])).toEqual([]);
  });
});
