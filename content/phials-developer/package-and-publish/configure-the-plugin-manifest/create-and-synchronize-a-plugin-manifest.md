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
import { definePluginManifest } from "@phoundry/phials-plugin-sdk/manifest";
import { version } from "../package.json";

export const pluginManifest = definePluginManifest({
  id: "acme.review-tools",
  name: "Review Tools",
  version,
  minAppVersion: "1.4.0",
  pluginApiVersion: "3.0.0",
  author: "Acme",
  description: "Adds review commands and file annotations.",
  repository: "https://github.com/acme/review-tools",
  icons: ["phoundry-mono:check"],
  permissions: [],
});
```

`package.json.version` is the sole release-version source. The manifest imports
it rather than repeating it. Change it by editing `package.json` or running:

```bash
npm version patch --no-git-tag-version
```

## Derive the runtime definition

Use `definePlugin()` so runtime identity is generated from the same source:

```ts
import { definePlugin } from "@phoundry/phials-plugin-sdk/manifest";
import { pluginManifest } from "./plugin.manifest";

export { mount, unmount } from "svelte";
export { pluginManifest as manifest } from "./plugin.manifest";

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

1. bundles the plugin as `dist/main.js` with any emitted `styles.css`;
2. imports that bundle and checks its manifest and default export, matching ID
   and version, and providers array;
3. emits `dist/manifest.json` from the bundled `manifest` export;
4. writes `release/release-inventory.json` with the candidate filenames, sizes,
   and checksums.

Both metadata files describe the same bundle. There is no authored JSON
manifest or separate manifest-sync command.

Inspect the generated release:

```bash
npm run release:verify
```

Do not edit the emitted manifest or inventory. Rebuild from source when the
candidate changes. Verification checks the exact candidate bytes and compares
the complete emitted manifest with the bundled export; it does not rebuild.

## Install a development build

`npm run dev:install` builds first, then installs the artifact set under the
normal Phials Home by default. An optional `--phials-home` argument or
`PHIALS_HOME` environment override selects a separate Home:

```bash
npm run dev:install -- --phials-home /absolute/path/to/test-home
```

For this example, the installed files are:

```text
<PHIALS_HOME>/plugins/acme.review-tools/
├── main.js
├── manifest.json
└── styles.css  # when emitted
```

The directory name, release manifest ID, and exported plugin ID must agree. See [Install a development plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/install-a-development-plugin-locally.md).

Do not rename the install folder independently or copy a manifest from another
build. To test a frozen release candidate, copy the already-built `dist/` files
to `<test-home>/plugins/acme.review-tools/` instead of using `dev:install`,
which would rebuild them. Theme assets, when present, need the supported
installed layout described in the release-artifact guide.

## Provide screenshots and a README

Place optional presentation content at the repository root:

```text
README.md
screenshots/
├── 01-overview.png
└── 02-workflow.webp
```

Community plugin cards show the first screenshot in filename order. Selecting a
card opens the plugin details, with all screenshots, the rendered README, and
repository and release links. Phials reads this content from the registry's
accepted release tag. Include the folder and README in that tag before releasing;
no manifest field or Plugin permission is required.

Phials displays up to eight PNG, JPEG, WebP, or GIF screenshots, at most 2 MiB
each, and a README of at most 256 KiB. Use numbered filenames to choose the order.
SVG and executable presentation content are excluded.

For a local development install, copy `README.md` and `screenshots/` beside
`manifest.json` in the installed plugin folder. Those local assets work offline.
Registry installs can load missing presentation assets from the installed
release's repository tag while online. Presentation content does not participate
in executable artifact verification and never enables Plugin code.

## Know what synchronization does not mean

The typed source manifest projects one identity graph:

```text
package.json.version
└─ src/plugin.manifest.ts
   ├─ definePlugin() → runtime identity
   └─ bundled manifest export → dist/manifest.json
                              → release/release-inventory.json
```

Generation does not:

- infer permissions from source code
- choose compatibility versions
- invent public metadata
- change the permanent plugin ID

You own those decisions. Build and release verification check structure and
artifact consistency, not whether permissions or compatibility bounds correctly
cover every workflow.

## Update one source, then rebuild

| Change                                      | Source to edit                   | Follow-up                                                        |
| ------------------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| Plugin version                              | `package.json`                  | Bump the version, then rebuild and verify.                       |
| ID, name, author, description, links, icons | `src/plugin.manifest.ts`         | Rebuild and validate all identity projections.                   |
| Permissions                                 | `src/plugin.manifest.ts`         | Rebuild, validate, and test first-install or changed-set review. |
| Minimum Phials or Plugin API version        | `src/plugin.manifest.ts`         | Rebuild and test compatible and incompatible versions.           |
| Capabilities or lifecycle hooks             | `src/main.ts` and related source | Do not add provider fields to the manifest.                      |

For release-wide version alignment, continue to [Choose a plugin release version](../prepare-a-release/choose-a-plugin-release-version.md).

## Reference

- [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md)
- [Public SDK support contract](../../reference/plugin-contract-and-compatibility/public-sdk-support-contract.md)
