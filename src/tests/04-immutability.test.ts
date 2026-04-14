import { describe, expect, test } from "bun:test";
import {
  appendItem,
  increment,
  relocate,
  removeAt,
  rename,
  replaceAt,
  reset,
  type CounterState,
  type User,
} from "../04-immutability";

const alice: User = {
  id: 1,
  name: "Alice",
  address: { city: "Lausanne", country: "Switzerland" },
};

describe("Exercise 4.1 — rename", () => {
  test("returns a new user with the updated name", () => {
    const result = rename(alice, "Bob");
    expect(result.name).toBe("Bob");
  });

  test("does not mutate the original", () => {
    rename(alice, "Bob");
    expect(alice.name).toBe("Alice");
  });

  test("preserves all other fields", () => {
    const result = rename(alice, "Bob");
    expect(result.id).toBe(alice.id);
    expect(result.address).toEqual(alice.address);
  });
});

describe("Exercise 4.1 — relocate", () => {
  test("returns a new user with the updated city", () => {
    const result = relocate(alice, "Bern");
    expect(result.address.city).toBe("Bern");
  });

  test("does not mutate the original", () => {
    relocate(alice, "Bern");
    expect(alice.address.city).toBe("Lausanne");
  });

  test("preserves the country inside address", () => {
    const result = relocate(alice, "Bern");
    expect(result.address.country).toBe("Switzerland");
  });

  test("preserves top-level fields", () => {
    const result = relocate(alice, "Bern");
    expect(result.id).toBe(1);
    expect(result.name).toBe("Alice");
  });
});

describe("Exercise 4.2 — appendItem", () => {
  test("adds item at the end", () => {
    expect(appendItem([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
  });

  test("does not mutate the original", () => {
    const arr = [1, 2, 3];
    appendItem(arr, 4);
    expect(arr).toEqual([1, 2, 3]);
  });

  test("works on empty array", () => {
    expect(appendItem([], "hello")).toEqual(["hello"]);
  });
});

describe("Exercise 4.2 — removeAt", () => {
  test("removes element at given index", () => {
    expect(removeAt([1, 2, 3, 4], 1)).toEqual([1, 3, 4]);
  });

  test("does not mutate the original", () => {
    const arr = [1, 2, 3];
    removeAt(arr, 0);
    expect(arr).toEqual([1, 2, 3]);
  });

  test("removes first element", () => {
    expect(removeAt(["a", "b", "c"], 0)).toEqual(["b", "c"]);
  });

  test("removes last element", () => {
    expect(removeAt(["a", "b", "c"], 2)).toEqual(["a", "b"]);
  });
});

describe("Exercise 4.2 — replaceAt", () => {
  test("replaces element at given index", () => {
    expect(replaceAt([1, 2, 3], 1, 99)).toEqual([1, 99, 3]);
  });

  test("does not mutate the original", () => {
    const arr = [1, 2, 3];
    replaceAt(arr, 0, 10);
    expect(arr).toEqual([1, 2, 3]);
  });

  test("replaces first element", () => {
    expect(replaceAt(["a", "b", "c"], 0, "z")).toEqual(["z", "b", "c"]);
  });
});

describe("Exercise 4.3 — increment", () => {
  const initial: CounterState = { value: 0, history: [] };

  test("increases value by step", () => {
    expect(increment(initial, 5).value).toBe(5);
  });

  test("appends previous value to history", () => {
    expect(increment(initial, 5).history).toEqual([0]);
  });

  test("chains correctly: history grows", () => {
    const s1 = increment(initial, 5); // value=5, history=[0]
    const s2 = increment(s1, 3); // value=8, history=[0, 5]
    expect(s2.value).toBe(8);
    expect(s2.history).toEqual([0, 5]);
  });

  test("does not mutate original state", () => {
    increment(initial, 1);
    expect(initial.value).toBe(0);
    expect(initial.history).toEqual([]);
  });
});

describe("Exercise 4.3 — reset", () => {
  const state: CounterState = { value: 10, history: [0, 5] };

  test("resets value to 0", () => {
    expect(reset(state).value).toBe(0);
  });

  test("appends previous value to history", () => {
    expect(reset(state).history).toEqual([0, 5, 10]);
  });

  test("does not mutate original state", () => {
    reset(state);
    expect(state.value).toBe(10);
    expect(state.history).toEqual([0, 5]);
  });
});
