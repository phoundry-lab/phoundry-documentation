---
title: "Choose a stable plugin ID and public metadata"
description: "Selects a valid non-reserved ID and supplies name, author, description, author URL, repository, and preload icons."
ai_disclosure: true
order: 2
---

# Choose a stable plugin ID and public metadata

Choose the permanent plugin ID before the first development install. Phials uses it for installation, enablement, permission approval, settings, storage, database namespacing, capability IDs, and update identity.

Changing the ID creates a different plugin. It does not rename the existing installation or migrate its data.

## Follow the ID format

A community plugin ID has two lowercase segments:

```text
vendor.plugin-name
```

It must match:

```regex
^[a-z][a-z0-9]*\.[a-z][a-z0-9-]*[a-z0-9]$
```

Valid:

```text
acme.review-tools
papertrail.pdf-review
studio7.contact-sheet
```

Invalid:

```text
ReviewTools
acme
acme.review_tools
acme.-review
acme.review-
phials.review-tools
```

The `phials.` namespace is reserved for built-in plugins. A community ID also cannot collide with an installed built-in identity.

Choose a vendor segment you control and a capability-oriented plugin segment. Avoid names tied to one temporary feature or implementation detail.

## Namespace child identities

Use the complete plugin ID as the prefix for public capability and event IDs:

```ts
const command: Command = {
  id: "acme.review-tools.review-selection",
  label: "Review Selection",
  action: () => {
    // Review the current selection.
  },
};

const provider: CommandProvider = {
  type: "command",
  id: "acme.review-tools.commands",
  name: "Review Tools commands",
  commands: [command],
};
```

Do not change the plugin ID to resolve a child-ID collision. Fix the child identity.

## Write public metadata for people

Required fields:

```json
{
  "name": "Review Tools",
  "author": "Acme",
  "description": "Adds review commands and file annotations."
}
```

Use:

- a concise product name, not the package filename
- the person or organization responsible for the release
- one sentence describing the user-visible outcome

Avoid:

- repeating the name in the description
- implementation-only language such as provider or registry names
- unsupported claims such as sandboxed, encrypted, or lossless
- release-specific marketing copy that becomes stale

The community registry can reuse these values. Keep them consistent with the repository and release page.

## Add public links

```json
{
  "authorUrl": "https://acme.example",
  "repository": "https://github.com/acme/review-tools"
}
```

Both fields are optional absolute HTTPS URLs.

Use `authorUrl` for the author's stable site or profile. Use `repository` for the public source repository used to report issues and inspect releases. Do not put an email address, a local path, or a bare `owner/repo` value in either manifest field.

The community-registry submission has its own `owner/repo` field; it is not a copy of the manifest's repository URL.

## Declare preload icons

List the Iconify identifiers the host must preload before or while activating the plugin:

```json
{
  "icons": [
    "phoundry-mono:check",
    "phoundry-mono:circle-info"
  ]
}
```

Keep the source-manifest list:

- unique
- limited to icons the release actually uses
- composed of complete `collection:name` identifiers

For Phoundry UI icons, prefer `PhiIcons` in the typed source manifest. The
release `manifest.json` is generated from this declaration:

```ts
import { PhiIcons } from "phoundry-ui/icons";
import { definePluginManifest } from "../../sdk/manifest-schema";

export const pluginManifest = definePluginManifest({
  id: "acme.review-tools",
  name: "Review Tools",
  version: "1.0.0",
  minAppVersion: "0.1.0",
  pluginApiVersion: "1.0.0",
  author: "Acme",
  description: "Adds review commands and file annotations.",
  icons: [PhiIcons.check, PhiIcons.info],
  permissions: [],
});
```

Icons are preload metadata, not an arbitrary asset-download mechanism. Include custom plugin assets in the supported release shape rather than putting URLs in `icons`.

## Treat identity as durable data

Before publishing or creating non-disposable development data, confirm:

1. the vendor segment is controlled by the author
2. the ID is not reserved or conflicting
3. package, manifest, runtime export, and install directory agree
4. every child ID is namespaced beneath it
5. the name and description remain useful without repository context

See [Set your plugin identity](../../get-started/build-your-first-plugin/set-your-plugin-identity.md) for the first-project walkthrough.

## Reference

- [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md)
- [Community plugin trust model](../../reference/plugin-contract-and-compatibility/community-plugin-trust-model.md)
