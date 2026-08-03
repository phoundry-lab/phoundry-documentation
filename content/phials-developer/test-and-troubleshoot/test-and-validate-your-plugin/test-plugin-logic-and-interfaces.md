---
title: "Test plugin logic and interfaces"
description: "Tests pure logic, provider behavior, component states, accessibility, and representative files without depending only on manual activation."
ai_disclosure: true
order: 2
---

# Test plugin logic and interfaces

Test the smallest stable unit first, then add provider and component tests around its public behavior. Run the starter suite once with:

```bash
npm run test:run
```

Use `npm test` while developing when you want watch mode.

## Test pure logic without Phials

Move parsing, matching, formatting, ordering, and state transitions into `.logic.ts` modules. Pure tests are fast and make edge cases explicit:

```typescript
import { describe, expect, it } from "vitest";
import { normalizePriority } from "./task.logic";

describe("normalizePriority", () => {
	it.each([
		["low", 0],
		["medium", 1],
		["high", 2],
		["unknown", 1],
	])("maps %s to %i", (input, expected) => {
		expect(normalizePriority(input)).toBe(expected);
	});
});
```

Include empty input, malformed input, boundary values, and a representative normal case. Avoid tests that only restate the implementation.

## Test provider behavior through the public contract

Build provider fixtures from public SDK shapes and invoke callbacks directly:

```typescript
import { describe, expect, it } from "vitest";
import { createFileEntry, createPluginApi } from "@phials/plugin-test";
import { reportMetadataProvider } from "./report-metadata.provider";

describe("report metadata", () => {
	it("extracts namespaced values from a supported report", async () => {
		const file = createFileEntry({
			name: "quarterly.report.json",
			path: "/fixtures/quarterly.report.json",
		});
		const api = createPluginApi({
			files: {
				readText: async () =>
					JSON.stringify({ title: "Q3", pages: 12 }),
			},
		});

		expect(await reportMetadataProvider.canHandle?.(file)).toBe(true);
		await expect(
			reportMetadataProvider.extract(file, {}, api.metadata),
		).resolves.toEqual({
			"example.reports:title": "Q3",
			"example.reports:pages": 12,
		});
	});
});
```

Test the provider’s visible decisions:

- supported and unsupported files
- priority or availability boundaries
- empty, malformed, and partially readable input
- expected Plugin API calls and parameters
- permission or I/O rejection
- cleanup, finalization, or retry behavior where the provider owns it

Use the public test fixtures rather than constructing host managers or registries.

## Test Svelte component states

Render plugin components with the same public props Phials supplies:

```typescript
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import ReportToolbar from "./ReportToolbar.svelte";

describe("ReportToolbar", () => {
	it("requests save when the edited report is dirty", async () => {
		const onSave = vi.fn();
		render(ReportToolbar, {
			props: { dirty: true, saving: false, onSave },
		});

		const button = screen.getByRole("button", { name: "Save report" });
		expect(button).toBeEnabled();
		await fireEvent.click(button);
		expect(onSave).toHaveBeenCalledOnce();
	});
});
```

Cover states that change behavior, not only the default render:

- loading, empty, populated, and error
- normal, hover-independent, disabled, and saving
- narrow and wide container inputs when the component adapts
- remount with retained session or instance state
- failed action with recovery

Query by role, accessible name, label, or visible text. Avoid generated Svelte classes and private Phoundry UI descendants.

## Check accessibility

Automate baseline accessibility checks and keep interaction assertions explicit:

```typescript
import { render } from "@testing-library/svelte";
import { axe } from "vitest-axe";
import ReportToolbar from "./ReportToolbar.svelte";

it("has no automated accessibility violations", async () => {
	const { container } = render(ReportToolbar, {
		props: { dirty: true, saving: false, onSave: () => {} },
	});

	expect(await axe(container)).toHaveNoViolations();
});
```

Also test what an automated scan cannot prove:

- logical keyboard order
- visible focus
- keyboard activation and escape behavior
- focus restoration after a dialog or menu
- useful labels and error association
- status changes announced when needed
- behavior at increased text size and reduced motion

Use [Design responsive and accessible plugin surfaces](../../get-started/use-svelte-and-phoundry-ui/design-responsive-and-accessible-plugin-surfaces.md) for the shared interaction contract.

## Use representative files

Keep small, reviewable fixtures under `tests/fixtures/`:

```text
tests/fixtures/reports/
├── empty.report.json
├── malformed.report.json
├── minimal.report.json
├── typical.report.json
└── unsupported.txt
```

Choose fixtures from behaviors the provider promises:

- smallest valid input
- common real-world input
- malformed or truncated input
- missing optional data
- unsupported extension or MIME type
- large-enough input to exercise bounded work without committing a huge binary

For binary or privacy-sensitive formats, generate a deterministic synthetic fixture or commit the smallest redistributable sample. Record the fixture’s origin and expected behavior.

## Keep runtime coverage

Unit and component tests do not replace installed-plugin tests. After the deterministic suite passes, install the exact release artifacts and verify activation, provider registration, permission failures, persistence, reload, and deactivation through [Run your plugin locally](../run-your-plugin-locally/index.md).
