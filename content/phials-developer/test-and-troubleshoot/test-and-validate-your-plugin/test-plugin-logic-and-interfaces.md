---
title: "Test plugin logic and interfaces"
description: "Tests pure logic, provider behavior, component states, accessibility, and representative files without depending only on manual activation."
ai_disclosure: true
order: 2
---

# Test plugin logic and interfaces

Run the example’s tests with:

```bash
npm test
```

This runs Node’s test runner with `tsx` once, not in watch mode. The included tests cover installation-path selection and release integrity. Test your own providers, components, and lifecycle behavior separately. Add focused tests for your plugin’s meaningful behavior.

## Test pure logic without Phials

Keep parsing, matching, formatting, and state transitions separate from host integration. For example, if your plugin has a `normalizePriority` helper, a test could use:

```typescript
import assert from "node:assert/strict";
import test from "node:test";
import { normalizePriority } from "../src/task.logic.ts";

test("normalizes priorities and handles unknown values", () => {
  for (const [input, expected] of [
    ["low", 0],
    ["medium", 1],
    ["high", 2],
    ["unknown", 1],
  ] as const) {
    assert.equal(normalizePriority(input), expected);
  }
});
```

Place tests in the paths matched by your test script. Include a normal case and meaningful malformed, empty, or boundary input rather than tests that merely restate the implementation.

## Use small local mocks

Give your own logic a narrow dependency interface and provide local mocks for the calls it uses. For example, a report loader could accept a `readText` callback:

```typescript
import assert from "node:assert/strict";
import test from "node:test";
import { loadReport } from "../src/report.logic.ts";

test("loads a report through the supplied reader", async () => {
  const paths: string[] = [];
  const readText = async (path: string): Promise<string> => {
    paths.push(path);
    return JSON.stringify({ title: "Q3", pages: 12 });
  };

  const report = await loadReport("/fixtures/q3.report.json", readText);
  assert.deepEqual(report, { title: "Q3", pages: 12 });
  assert.deepEqual(paths, ["/fixtures/q3.report.json"]);
});

test("propagates a read failure", async () => {
  const readText = async (_path: string): Promise<string> => {
    throw new Error("read failed");
  };

  await assert.rejects(
    loadReport("/fixtures/q3.report.json", readText),
    /read failed/,
  );
});
```

These are illustrative tests for helpers you implement, not functions supplied by the example or SDK. Match expected failure handling to your actual contract.

For providers, invoke callbacks through the public SDK shapes where practical and check supported input, availability, expected calls, rejection, and cleanup. Avoid constructing private Phials managers or pretending a local mock proves host permission enforcement.

## Test interfaces separately

The example does not bundle a DOM environment, component-testing library, accessibility scanner, or Vitest. You may add tools such as Svelte Testing Library and an appropriate runner if your UI needs automated interaction tests; configure those separately rather than assuming `npm test` renders Svelte components.

Whether automated or manual, focus on behavior:

- loading, empty, populated, and error states;
- disabled and pending actions;
- keyboard activation, focus order, and focus restoration;
- useful labels and error association;
- remounting and recovery after failure; and
- increased text size and narrow containers.

Query by role and accessible name in component tests rather than generated classes or private UI-library descendants. Automated accessibility scans supplement, but do not replace, keyboard and focus checks.

See [Design responsive and accessible plugin surfaces](../../get-started/use-svelte-and-phoundry-ui/design-responsive-and-accessible-plugin-surfaces.md).

## Use representative files

Keep small, reviewable fixtures under `tests/fixtures/`. Cover the smallest valid input, typical input, malformed or truncated input, missing optional data, and unsupported formats. For binary or sensitive formats, generate a deterministic synthetic fixture or use a small redistributable sample.

## Keep runtime coverage

Unit tests do not replace installed-plugin testing. Verify activation, provider registration, permission failures, persistence, reload, and deactivation in Phials. For a frozen release candidate, copy the exact built files rather than running the development installer, which rebuilds first. Follow [Build and validate release artifacts](build-and-validate-release-artifacts.md).
