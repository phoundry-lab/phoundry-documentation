---
title: "Fix permission and Plugin API failures"
description: "Maps rejected operations to manifest permissions, approval state, compatibility, unsupported commands, and typed-API alternatives."
ai_disclosure: true
order: 4
---

# Fix permission and Plugin API failures

Permission and API failures occur at several distinct boundaries: a manifest
permission may be absent, the current permission set may await user review, the
running Phials build may not support the targeted Plugin API version, or code
may be calling an operation outside the public SDK. Preserve the exact rejected
operation before changing the manifest.

## Identify the failed boundary

| Visible symptom | Likely cause | Next action | Expected result |
| --- | --- | --- | --- |
| The installed card says **Permissions need review** | An install or update changed the requested permission set | Review the complete current set and approve or deny it | Approval clears the review state and permits activation |
| A typed operation reports permission denied | The required permission is absent or not approved | Map the method to the permission reference and add only that permission | After rebuild, reinstall, and approval, the same operation succeeds |
| TypeScript says an API member does not exist | The code and synchronized public SDK differ, or the member is unsupported | Update from the current starter SDK and use the documented typed service | `npm run check` passes without a cast |
| `api.invoke` rejects a host command | The command is not approved or its required permission is absent | Use a typed Plugin API service when one exists; otherwise verify the approved command reference | The supported call succeeds with the declared permission |
| An API works in activation but is unavailable in a provider callback or component | Code is using the wrong runtime scope or a retained API from a deactivated activation | Use the API passed to the current callback or activation | The operation runs only while the current plugin activation is active |
| A permitted operation reaches the OS but still fails | The path, file state, network, clipboard, or operating-system policy rejected the request | Handle the runtime error as an operation failure rather than requesting broader permissions | The user receives a specific recoverable message |

Plugin permissions gate supported Plugin API operations and approved host
commands. They do not turn community plugin JavaScript into a sandbox and they
do not guarantee that the operating system will accept a permitted operation.

## Map the operation to the least permission

Start with the public operation that failed. The manifest permission should
describe that operation, not a broad guess:

```json
{
	"id": "com.example.review-tools",
	"permissions": ["filesystem.read", "clipboard.write"]
}
```

For example, a workflow that reads selected text files and copies a generated
summary needs read access and clipboard write access. It does not need
filesystem write, clipboard read, or network fetch.

Use [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md)
to map exact methods to permissions, then verify the manifest against
[Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md).

After changing permissions:

```bash
npm run check
npm run build
npm run validate
npm run dev:install
```

The installed card should show **Permissions need review**. That interruption is
expected: permission expansion is never silently approved. Review the final
release description and permission set, approve it, then enable or reload the
plugin. If the card does not request review, confirm that the updated
`dist/manifest.json` was the release actually installed.

## Prefer typed Plugin API services

Use the most specific public API:

- `api.files` for supported file and folder operations;
- `api.modal` and `api.notify` for user interaction;
- `api.settings`, `api.storage`, and `api.database` for plugin-owned data;
- `api.modules` for opening or focusing supported center tabs;
- `api.events` for supported event delivery; and
- provider-specific methods on [PreviewAPI](../../reference/sdk-type-reference/PreviewAPI.md), [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md), [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md), or
  [ModuleAPI](../../reference/sdk-type-reference/ModuleAPI.md) when that callback supplies them.

Use `api.invoke` only for a command listed in the approved host command
reference and only when no typed service covers the operation. A command name
found in host source or console output is not a public contract.

Do not repair a missing member with `as unknown as`, a hand-written ambient
declaration, or a deep import from Phials. Those changes hide the compatibility
failure until runtime. Sync the current starter SDK, use the generated type
reference, and declare the `pluginApiVersion` that contains the contract your
release actually uses.

## Check runtime scope and lifetime

Phials passes the base [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) to `onActivate`. Bind it to a plugin-owned
module for commands and components, then clear it in `onDeactivate`. Provider
callbacks that receive specialized APIs should use the argument supplied for
that invocation.

An error such as “plugin is not active” usually means code ran:

- during module import, before `onActivate`;
- after deactivation began;
- from a stale asynchronous continuation; or
- through a component retained after its logical instance closed.

Move startup work into `onActivate`, cancel retained work during deactivation,
and guard asynchronous completion against stale instances. See
[Understand runtime API scopes](../../work-with-phials/use-app-and-explorer-context/understand-runtime-api-scopes.md).

## Keep compatibility declarations truthful

If the synchronized SDK exposes a member but the running Phials build does not,
verify both version boundaries:

- `minAppVersion` is the oldest Phials release the plugin supports.
- `pluginApiVersion` is the public SDK contract version the plugin targets.

Raise the declarations when a release adopts a newer requirement. Do not catch a
missing-member error and silently continue with partial behavior unless the
plugin explicitly supports both contracts and feature-detects a documented
optional capability.

The failure is resolved when type checking uses only public declarations, the
installed manifest requests the least permission set, the user has approved
that exact set, and the original typed operation either succeeds or reports a
specific runtime condition.
