---
title: "Validate a plugin manifest"
description: "Uses SDK manifest helpers and build-time checks, then verifies the exact release bytes and full manifest before publication."
ai_disclosure: true
order: 5
---

# Validate a plugin manifest

Use the manifest helpers in `@phoundry/phials-plugin-sdk/manifest` while
authoring, then build and verify before publishing. The current starter pins
the SDK package to `3.1.0`. A valid manifest is necessary, but it does not prove
that the plugin works or that its declared compatibility bounds are correct.

## Run the release validator

From the plugin project:

```bash
npm run build
npm run release:verify
```

The build imports the built module and checks its manifest export, default
plugin definition, matching ID and version, and providers array. It emits
`dist/manifest.json` and `release/release-inventory.json` from that bundle.
The SDK parser checks manifest shape, known fields, versions, permissions,
and icon declarations.

`release:verify` checks the current candidate filenames, sizes, and checksums
against that inventory and compares the complete emitted manifest with the
bundled manifest export. It does not rebuild or exhaustively validate provider
behavior. It imports your code in Node, not in a sandbox, and is not a CSS or
dependency-policy audit.

Do not publish a release that passes the schema in isolation but fails artifact
consistency. Keep runtime tests separate from these structural checks.

## Validate during authoring

The SDK package exports `parseManifest` and `validateManifest` for tooling.
For example, inspect an already-built manifest:

```ts
import { readFile } from "node:fs/promises";
import { parseManifest } from "@phoundry/phials-plugin-sdk/manifest";

const json = await readFile(
  new URL("../dist/manifest.json", import.meta.url),
  "utf8",
);
const result = parseManifest(json);

if (result.manifest === null) {
  for (const error of result.errors) {
    console.error(error);
  }
  process.exitCode = 1;
}
```

Install and update the SDK dependency rather than copying declarations or
validators from Phials application source. There is no starter-local SDK folder
to synchronize.

`parseManifest` parses JSON and validates the resulting value. `validateManifest` validates an already parsed unknown value.

## Fix field-specific errors

Validation reports the field and rule:

```text
id: reserved prefix "phials." is not allowed
version: expected semantic version such as "1.2.0"
repository: expected an absolute HTTPS URL
permissions[1]: unsupported permission "filesystem.delete"
icons[2]: expected an Iconify "collection:name" identifier
unknown field "providers"
```

Fix the source field named by the error, rebuild, and rerun the validator. Do not rename an unsupported field until the error disappears by coincidence; check the [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md).

## Reject unknown fields

The manifest schema is strict. A misspelling is an error:

```json
{
  "minAppVerison": "1.4.0"
}
```

Do not use the manifest as a general configuration object. Plugin settings, provider definitions, feature flags, release notes, and arbitrary registry metadata belong elsewhere.

Strict rejection protects authors from believing Phials honored a field it ignored.

## Validate relationships

Some values are valid alone but invalid together.

Check:

- `filesystem.write` is not paired with redundant `filesystem.read`
- permission names are unique
- icon names are unique
- `src/plugin.manifest.ts` imports the sole version value from `package.json`
- the release manifest and exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) share ID, name, and version
- the install directory uses the manifest ID
- the ID does not use `phials.` or conflict with a built-in
- `minAppVersion` and `pluginApiVersion` match the APIs actually used

Build and release verification check artifact relationships. The manifest
parser alone cannot inspect `package.json` or execute the built module. The
starter relies on the source manifest importing the package version; it does
not separately compare package metadata against the release.

## Distinguish schema and compatibility

A valid manifest can still target a newer runtime:

```json
{
  "minAppVersion": "9.0.0",
  "pluginApiVersion": "3.0.0"
}
```

These strings can be valid semantic versions while remaining incompatible with the current app. Test compatibility separately with [Verify permissions and runtime compatibility](../../test-and-troubleshoot/test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md).

## Validate the exact release

Run `npm run release:verify` after the final build and before attaching files
to a release. Verify the files that will be published, not only the source tree.

For local development:

```text
dev:install (builds first) → reload
```

For publishing:

```text
build → release:verify → test exact files → release:verify → publish
```

For frozen-candidate testing, copy the existing `dist/` artifacts into the
isolated Home using the supported installed layout. Do not use `dev:install`:
it rebuilds and therefore does not install a frozen candidate unchanged.

Continue to [Build and validate release artifacts](../../test-and-troubleshoot/test-and-validate-your-plugin/build-and-validate-release-artifacts.md).

## Reference

- [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md)
- [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md)
- [Version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md)
