# Functional Programming Exercises in TypeScript v0.1.5 <!-- x-release-please-version -->

This repository contains a series of guided exercises to learn the fundamentals of functional programming in TypeScript. You will work through pure functions, higher-order functions, composition, immutability, currying, and a real-world data pipeline.

## Prerequisites

You must have [bun](https://bun.com/) ≥ 1.3 installed on your system

## Setup

```bash
git clone <your-fork-url>
cd ex-fp
bun install
bun test        # run the full test suite
```

## Modules

1. [Pure functions](src/01-pure-functions.ts)
2. [Higher-Order Functions](src/02-hof-array.ts)
3. [Composition](src/03-composition.ts)
4. [Immutability](src/04-immutability.ts)
5. [Currying](src/05-currying.ts)
6. [Options](src/06-option.ts)
7. [Data transformation pipelines](src/07-data-pipeline.ts)

Work through the modules **in order**, later modules build on earlier ones.

## How to work

1. Open the exercise file for the current module.
2. Read the module comment at the top and the doc comment above each function.
3. Write your implementation.
4. Run `bun test` (or `bun test --watch`) to check your work.
5. Move to the next exercise when all tests pass.

You can run a single module's tests with:

```bash
bun test src/tests/01-pure-functions.test.ts
```

## Rules

- **Do not modify the test files.** Tests are the specification, your code must satisfy them as written.
- **No AI for solutions.** The goal is to build a mental model of FP. If you ask an AI to write the code for you, you defeat the purpose entirely. Use AI only to ask for explanations of concepts you do not understand.
- **One commit per exercise** Use [Conventional Commits](https://www.conventionalcommits.org/).

## Code quality

```bash
bun run format        # format all files with oxfmt
bun run format:check  # check formatting without writing
bun run lint          # lint with oxlint
```

Run `bun run format` before submitting.
