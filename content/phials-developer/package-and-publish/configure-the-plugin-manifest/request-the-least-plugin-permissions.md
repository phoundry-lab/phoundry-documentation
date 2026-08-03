---
title: "Request the least plugin permissions"
description: "Maps supported operations to the smallest manifest permission set and anticipates user review when that set changes."
ai_disclosure: true
order: 4
---

# Request the least plugin permissions

Add a permission only when the plugin uses a supported Plugin API operation gated by it.

```json
{
  "permissions": [
    "filesystem.read"
  ]
}
```

An empty array is correct for a plugin that uses only always-available operations:

```json
{
  "permissions": []
}
```

## Map operations to permissions

| Permission | Request when the plugin must |
| --- | --- |
| [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread) | list or watch folders, read text, or use another read-gated file operation |
| [`filesystem.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemwrite) | create, write, rename, or move files and folders to Trash |
| [`clipboard.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#clipboardread) | read the current system clipboard |
| [`clipboard.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#clipboardwrite) | replace current system clipboard content |
| [`network.fetch`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#networkfetch) | call the permission-gated `api.fetch` service |
| [`workspace-folders.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#workspace-foldersread) | read supported Workspace Folder schemas, values, tags, ratings, or known folders |
| [`workspace-folders.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#workspace-folderswrite) | make validated atomic Workspace Folder mutations |

`filesystem.write` includes the supported read operations. Do not request both filesystem permissions.
`workspace-folders.write` likewise includes `workspace-folders.read`; do not
request both Workspace Folder permissions.

Use [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md) to look up the exact method-to-permission mapping.

## Start from the workflow

List the plugin's user-visible workflows, then map each operation:

| Workflow | Operations | Permission |
| --- | --- | --- |
| Observe the next Phials save event | `api.events.on` | none |
| Show a notification | `api.notify.success` | none |
| Let a user choose a folder | `api.files.pickDirectory` | none |
| Read the chosen folder | `api.files.readDirectory` | `filesystem.read` |
| Save a review sidecar | `api.files.writeText` | `filesystem.write` |

This makes the permission explanation traceable to behavior. Do not request permissions for hypothetical future features.

## Keep the list canonical

Use exact permission names once each:

```json
{
  "permissions": [
    "clipboard.write",
    "filesystem.read"
  ]
}
```

Sort the list for stable diffs. Validation rejects unknown names, duplicates, and redundant filesystem combinations.

There is no catch-all permission and no `shell.execute` permission. Do not invent one or use raw host access as a substitute.

## Understand permission review

Phials stores the exact permission set the user approved for the installed plugin ID.

When a later manifest changes that set:

1. Phials marks the plugin as needing permission review.
2. Its enabled preference remains recorded, but the changed release cannot
   activate.
3. The Installed card shows the current requested permissions.
4. The user approves or declines the complete new set.
5. Only an approved, enabled plugin can activate.

Any set change can require review, including removing a permission. This prevents silent drift between the reviewed manifest and the installed one.

Changing plugin code without changing the permission set does not trigger another review.

## Explain permission changes

When a release adds or changes permissions:

- name the user-visible feature that needs each permission
- explain when the operation occurs
- identify whether the action is user-initiated or automatic
- document how to avoid or disable the feature when applicable

Do not describe plugin permissions as an operating-system sandbox. Community plugins run as trusted renderer JavaScript; permissions gate supported Phials APIs. See [Community plugin trust model](../../reference/plugin-contract-and-compatibility/community-plugin-trust-model.md).

## Test the real manifest

In an isolated Phials Home:

1. Install and approve a release with the old permission set.
2. Enable and activate it.
3. Install the release containing the changed set.
4. Confirm Phials preserves the enabled preference, deactivates the old
   runtime, and shows permission review.
5. Decline and confirm it remains disabled.
6. Approve, enable, and exercise every gated operation.
7. Remove the permission and verify the operation is rejected.

Test both permission presence and least privilege. A successful API call proves only the needed permission exists; it does not prove the manifest avoids unnecessary permissions.

## Reference

- [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md)
- [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md)
- [Fix permission and Plugin API failures](../../test-and-troubleshoot/debug-plugin-failures/fix-permission-and-plugin-api-failures.md)
