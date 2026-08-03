---
title: "Validate a plugin manifest"
description: "Runs the synchronized schema helper, interprets field-specific errors, and rejects unknown, malformed, or inconsistent values before build output is published."
ai_disclosure: true
order: 5
---

# Validate a plugin manifest

Run manifest validation before building, installing, or publishing. The plugin starter uses the same synchronized schema contract as Phials, so a field rejected locally will not become a runtime surprise.

## Run the release validator

From the plugin project:

```bash
npm run build
npm run validate
```

A successful check ends with:

```text
validate-dist: OK
```

The release validator checks more than JSON shape:

- required release files exist
- `manifest.json` is valid UTF-8 JSON
- every manifest field is known and well-typed
- identity and semantic versions are valid
- permission and icon lists are canonical
- package, source manifest, release manifest, and exported plugin identity agree
- `main.js` is a loadable ES module with a valid default plugin export

Do not publish a release that passes the schema in isolation but fails artifact consistency.

## Validate during authoring

The synchronized SDK exports `parseManifest` and `validateManifest` for tooling:

```ts
import { readFile } from "node:fs/promises";
import { parseManifest } from "../sdk/manifest-schema";

const json = await readFile(
  new URL("../public/manifest.json", import.meta.url),
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

Use the copy committed in the plugin starter's `sdk/` directory. Do not copy a validator from Phials application source or maintain a second schema.

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
- the source and package versions match before synchronization
- the release manifest and exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) share ID, name, and version
- the install directory uses the manifest ID
- the ID does not use `phials.` or conflict with a built-in
- `minAppVersion` and `pluginApiVersion` match the APIs actually used

The artifact validator owns cross-file relationships. The manifest parser cannot inspect `package.json` or execute the built module by itself.

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

Run validation after the final build and before attaching files to a release. Validate the files that will be published, not only the source tree.

For local development:

```text
build → validate dist → install dist → reload
```

For publishing:

```text
build → validate dist → package exact files → verify package → publish
```

Continue to [Build and validate release artifacts](../../test-and-troubleshoot/test-and-validate-your-plugin/build-and-validate-release-artifacts.md).

## Reference

- [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md)
- [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md)
- [Version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md)
