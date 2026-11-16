---
title: "Type-check your plugin project"
description: "Runs the starter’s Svelte and TypeScript checks against plugin source and the public SDK package."
ai_disclosure: true
order: 1
---

# Type-check your plugin project

Use Node 24 and install the locked dependencies, then run the example’s source check:

```bash
npm ci
npm run check
```

The check covers TypeScript and Svelte source using the project’s compiler configuration. A successful run exits with status `0` and no Svelte or TypeScript errors. An editor showing no diagnostics is not a substitute for this command.

## Use the published public SDK

The example depends on `@phoundry/phials-plugin-sdk` at exactly `3.1.0` from npm. There is no local `sdk/` folder to synchronize or edit. Import public types and manifest helpers from that package.

When adopting a newer SDK, update the dependency deliberately, commit the resulting lockfile, and review any source changes the new contract requires. Set `pluginApiVersion` in `src/plugin.manifest.ts` to the contract you actually target and test with a Phials build that supports it.

A type available only in Phials application source is not a supported plugin dependency. Use a public type or request a public contract instead of copying internal declarations.

## Fix the contract mismatch

| Failure | Correct response |
| --- | --- |
| Provider property or callback no longer matches | Update the provider to the installed SDK |
| Component receives the wrong props | Update the component and provider together |
| Svelte rune or snippet error | Correct the component’s Svelte 5 usage |
| Public import fails | Check the installed package version and exported entry points |
| Required public type is absent | Stop depending on the unsupported type |

Do not use broad casts such as `as any` to hide a boundary mismatch or weaken production compiler options for a test double. Prefer narrow local interfaces for the dependencies your logic actually calls.

## Keep build and checks aligned

Keep production source inside the configured paths and use the same entry path for checks and builds. The package version is imported into `src/plugin.manifest.ts`; do not duplicate it in source or repair it by editing generated output.

Run `npm run check` in continuous integration as well as locally. Continue with [Test plugin logic and interfaces](test-plugin-logic-and-interfaces.md).

For component patterns, see [Build plugin components with Svelte 5](../../get-started/use-svelte-and-phoundry-ui/build-plugin-components-with-svelte-5.md).
