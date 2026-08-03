---
title: "Create and synchronize a plugin manifest"
description: "Starts from the starter manifest, keeps build output synchronized, and preserves one matching identity and version across source and release artifacts."
ai_disclosure: true
order: 1
---

# Create and synchronize a plugin manifest

Use the typed source manifest supplied by `phials-plugin-example`. It is the
single authority for identity, compatibility, permissions, public links, and
icon preload declarations.

## Edit the source manifest

Replace the starter values in `src/plugin.manifest.ts`:

```ts
import { definePluginManifest } from "../sdk/manifest-schema";

export const pluginManifest = definePluginManifest({
	id: "acme.review-tools",
	name: "Review Tools",
	version: "0.1.0",
	minAppVersion: "1.4.0",
	pluginApiVersion: "1.0.0",
	author: "Acme",
	description: "Adds review commands and file annotations.",
	repository: "https://github.com/acme/review-tools",
	icons: ["phoundry-mono:check"],
	permissions: [],
});
```

Keep `package.json.version` equal to the source manifest. It is a validated
package projection, not a second authority.

## Derive the runtime definition

Use `definePlugin()` so runtime identity is generated from the same source:

```ts
import { definePlugin } from "../sdk/manifest-schema";
import { pluginManifest } from "./plugin.manifest";

export default definePlugin(pluginManifest, {
	providers: [],
});
```

The runtime definition owns providers, settings, database schema, and lifecycle
hooks. It does not repeat source-manifest identity or icon preload metadata.

## Build the synchronized manifest

```bash
npm run build
```

The build:

1. validates `src/plugin.manifest.ts` with field-specific errors;
2. checks `package.json.version` against the source manifest;
3. generates the data-only `public/manifest.json`;
4. builds the plugin's ES module and CSS;
5. copies the generated projection to `dist/manifest.json`.

Inspect the generated release:

```bash
npm run validate
```

Do not edit either generated JSON manifest. A later source-manifest sync replaces
it.

## Keep development install atomic

The starter development installer reads the ID from the validated release manifest and places the artifact set at:

```text
<PHIALS_HOME>/plugins/acme.review-tools/
├── main.js
├── manifest.json
└── styles.css
```

The directory name, release manifest ID, and exported plugin ID must agree. See [Install a development plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/install-a-development-plugin-locally.md).

Do not rename the install folder independently or copy a manifest from another build.

## Know what synchronization does not mean

The typed source manifest projects one identity graph:

```text
src/plugin.manifest.ts
├─ definePlugin() → runtime identity
├─ generation → public/manifest.json → dist/manifest.json
└─ validation → package version, release tag, registry, candidate checksum
```

Generation does not:

- infer permissions from source code
- choose compatibility versions
- invent public metadata
- change the permanent plugin ID

You own those decisions, and validation verifies them.

## Update one source, then rebuild

| Change | Source to edit | Follow-up |
| --- | --- | --- |
| Plugin version | `src/plugin.manifest.ts` | Set the matching package version, then rebuild and validate. |
| ID, name, author, description, links, icons | `src/plugin.manifest.ts` | Rebuild and validate all identity projections. |
| Permissions | `src/plugin.manifest.ts` | Rebuild, validate, and test first-install or changed-set review. |
| Minimum Phials or Plugin API version | `src/plugin.manifest.ts` | Rebuild and test compatible and incompatible versions. |
| Capabilities or lifecycle hooks | `src/main.ts` and related source | Do not add provider fields to the manifest. |

For release-wide version alignment, continue to [Choose a plugin release version](../prepare-a-release/choose-a-plugin-release-version.md).

## Reference

- [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md)
- [Public SDK support contract](../../reference/plugin-contract-and-compatibility/public-sdk-support-contract.md)
