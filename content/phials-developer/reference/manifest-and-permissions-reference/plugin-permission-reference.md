---
title: "Plugin permission reference"
description: "Lists every permission, user-facing description, risk level, and unsupported permission name."
ai_disclosure: true
order: 2
---

# Plugin permission reference

A [PluginPermission](../../reference/sdk-type-reference/PluginPermission.md) is one exact string in `manifest.json.permissions`.
Permissions gate supported Plugin API operations and approved host commands for
the installed plugin identity. They do not sandbox community plugin JavaScript
or guarantee that the operating system will permit an approved operation.

## Complete permission catalog

| Permission | Permission-review description | Risk label | Grants |
| --- | --- | --- | --- |
| `filesystem.read` | Read files from your filesystem | Low | Supported directory listing, arbitrary-path text and binary reads, embedded-cover reads, and directory watches |
| `filesystem.write` | Write and delete files on your filesystem | High | Every supported `filesystem.read` operation plus directory creation, text and binary writes, rename, and moving files or folders to Trash |
| `clipboard.read` | Read content from your clipboard | Medium | `api.clipboard.readText()` |
| `clipboard.write` | Write content to your clipboard | Low | `api.clipboard.writeText()` |
| `network.fetch` | Make network requests to external servers | Medium | `api.fetch()` |
| `workspace-folders.read` | Read Workspace Folder schemas and values | Medium | Supported Workspace Folder schemas, values, tags, ratings, known-folder summaries, and existing Page opening |
| `workspace-folders.write` | Change Workspace Folder schemas and values | High | Every supported `workspace-folders.read` operation plus validated atomic Workspace Folder mutations and host-mediated implicit creation |

Risk labels are review cues, not security ratings. A low-risk label does not
make an operation harmless in every workflow, and a high-risk label does not
mean the operation is prohibited.

## `filesystem.read`

Accepted manifest value:

```json
{
	"permissions": ["filesystem.read"]
}
```

This permission gates supported Plugin API operations that inspect arbitrary
user files and folders. It does not grant a write, rename, Trash, clipboard, or
network operation.

Provider-scoped reads explicitly supplied to [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md) extraction are
available through [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md) without adding a broad manifest permission.
Their scope and lifetime are part of that provider contract.

## `filesystem.write`

Accepted manifest value:

```json
{
	"permissions": ["filesystem.write"]
}
```

This permission implies the supported `filesystem.read` operations. Do not
declare both:

```json
{
	"permissions": [
		"filesystem.read",
		"filesystem.write"
	]
}
```

The redundant pair is invalid. `filesystem.write` covers supported mutation,
not arbitrary shell execution or permanent-delete commands. The typed Trash
operations move items to the operating system's Trash.

## `clipboard.read`

Accepted manifest value:

```json
{
	"permissions": ["clipboard.read"]
}
```

This permission gates reading current text through
`api.clipboard.readText()`. It does not grant clipboard writes.

Clipboard content may contain credentials or private user data. Read it only
from a clear user workflow and do not include it in diagnostics by default.

## `clipboard.write`

Accepted manifest value:

```json
{
	"permissions": ["clipboard.write"]
}
```

This permission gates replacing current clipboard text through
`api.clipboard.writeText(text)`. It does not grant clipboard reads.

## `network.fetch`

Accepted manifest value:

```json
{
	"permissions": ["network.fetch"]
}
```

This permission gates `api.fetch(input, init)`. It does not imply file or
clipboard access.

`network.fetch` applies to the supported Plugin API wrapper. Community plugins
run as trusted renderer JavaScript, so it is not a network sandbox for ambient
browser APIs or bundled dependencies.

## `workspace-folders.read`

```json
{
	"permissions": ["workspace-folders.read"]
}
```

This permission gates protected reads through `api.workspaceFolders`. Basic
pane capability state does not reveal protected schemas, values, or known
Workspace Folder paths.

## `workspace-folders.write`

```json
{
	"permissions": ["workspace-folders.write"]
}
```

This permission implies `workspace-folders.read`. Declaring both is invalid.
It is distinct from `filesystem.write`: changing Workspace Folder properties is
not the same trust decision as changing file bytes.

## Invalid permission names

The permission list is a closed enum. Every string outside the seven catalog
values is invalid, including:

```text
shell.execute
filesystem.delete
filesystem
network
network.request
clipboard
process.execute
*
```

There is no catch-all permission and no supported shell or process-execution
permission. Letter case matters; `Filesystem.Read` is invalid.

Values must appear at most once. Non-string values and `null` are invalid.

## Permission review

Phials compares the complete requested set with the last set approved for the
installed plugin ID. Ordering does not affect comparison.

Review is required when:

- a plugin is installed for the first time, including with an empty set;
- an update adds a permission;
- an update removes a permission; or
- an update replaces one permission with another.

Until the current set is approved, the community plugin cannot activate. An
earlier approval does not approve later permission changes. The enabled
preference remains recorded while review or community plugin safe mode blocks
activation.

Approval does not bypass:

- community plugin safe mode;
- minimum Phials or Plugin API compatibility;
- module loading and plugin activation;
- the approved `api.invoke` command allowlist; or
- operating-system errors and access controls.

The exact typed-operation mapping is in
[Permission-gated Plugin API operations](./permission-gated-plugin-api-operations.md).
