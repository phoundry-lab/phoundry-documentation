---
title: "Type-check your plugin project"
description: "Runs the starter’s Svelte and TypeScript checks against plugin source and the synchronized public SDK."
ai_disclosure: true
order: 1
---

# Type-check your plugin project

Run the starter’s source check before building:

```bash
npm run check
```

The check covers:

- TypeScript under `src/`
- Svelte component markup, props, events, and runes
- the committed declarations under `sdk/`
- imports and compiler options used by the production build

A successful check exits with status `0` and no Svelte or TypeScript errors.

## Keep the synchronized public SDK intact

The starter’s `sdk/` directory is generated public contract material. It includes plugin, provider, file, command, shortcut, event, pane-context, and manifest declarations. Do not edit generated files to make an error disappear.

When adopting a newer public SDK:

```bash
npm run sdk:sync
npm run check
```

Review the synchronized diff before committing it. Then set `pluginApiVersion` to the contract version the plugin actually targets and test against a Phials build that supports it.

If a type exists only in Phials application source and is absent from the synchronized SDK, it is not a supported plugin dependency. Use the public type or request a public contract instead of copying an internal declaration.

## Fix the contract mismatch

Treat a check failure according to its owner:

| Failure | Correct response |
| --- | --- |
| Provider property or callback no longer matches | Update the provider to the synchronized SDK |
| Component receives the wrong prop shape | Update the component and its provider together |
| Svelte rune or snippet error | Correct the component using the starter’s Svelte 5 conventions |
| Manifest helper import fails | Re-synchronize the complete SDK, including manifest tooling |
| A required public type is absent | Stop depending on the unsupported type |
| Generated SDK file has a local edit | Revert the edit and fix plugin source |

Do not add broad casts such as `as any` at the plugin boundary. A cast can hide the exact mismatch that would otherwise fail during activation or provider invocation.

## Check the production entry path

The type check must include the same entry files and generated declarations used by the build. Keep source inside the starter’s included paths and avoid a second relaxed `tsconfig` for release code.

When a test file intentionally creates incomplete fixtures, keep the relaxation local:

```typescript
const file = {
	name: "report.pdf",
	path: "/fixtures/report.pdf",
	is_file: true,
	is_dir: false,
} satisfies Pick<FileEntry, "name" | "path" | "is_file" | "is_dir">;
```

Do not weaken production compiler options to accommodate a test double.

## Reproduce the check in a clean environment

Before release:

```bash
npm ci
npm run sdk:verify
npm run check
```

`sdk:verify` confirms that generated SDK files match the declared `pluginApiVersion` and have no local edits. `npm ci` confirms the committed lockfile can reproduce the dependency graph.

Run the same commands in continuous integration. A local editor showing no diagnostics is not a substitute for the project check.

For Svelte-specific component patterns, use [Build plugin components with Svelte 5](../../get-started/use-svelte-and-phoundry-ui/build-plugin-components-with-svelte-5.md).
