---
title: "Change permissions and compatibility safely"
description: "Treats permission expansion and raised app or API requirements as explicit user-facing changes and verifies review and incompatible-build behavior."
ai_disclosure: true
order: 2
---

# Change permissions and compatibility safely

Treat a changed permission set or raised runtime boundary as a user-facing release change. Update the manifest, release notes, version classification, and upgrade tests together.

## Review the before-and-after contract

Record the previous and proposed values:

```json
{
  "permissions": [
    "filesystem.read"
  ],
  "minAppVersion": "1.4.0",
  "pluginApiVersion": "1.0.0"
}
```

For every change, identify the exact code or workflow that requires it. Do not raise a boundary or request a permission merely because a newer development environment is available.

## Change permissions deliberately

Phials stores the exact permission set approved for an installed plugin ID. Any difference can require permission review, including removing a permission.

When an update changes the set:

1. Phials installs the matching release artifacts.
2. The updated plugin cannot activate under the old approval.
3. The user reviews the complete new set.
4. Activation remains blocked until the current set is approved.

The enabled preference remains recorded while review blocks activation. If the
approved replacement cannot activate, Phials restores the previous working
release rather than leaving a mixed runtime.

An expansion deserves particular care. For each added permission, document:

- the exact manifest name
- the user-visible feature that needs it
- the operation and data it permits
- when the operation occurs
- whether a workflow avoids it

Do not request a permission until the release contains the feature that uses it. When removing a permission, remove every gated call first and test the complete plugin without it.

Use [Request the least plugin permissions](../configure-the-plugin-manifest/request-the-least-plugin-permissions.md) for the decision workflow and [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md) for exact names.

## Raise compatibility only when required

Raise `minAppVersion` when the plugin depends on behavior introduced by a newer Phials release. Raise `pluginApiVersion` when the release uses a newer public SDK contract.

Keep the boundaries separate:

```text
current Phials version ≥ minAppVersion
and
supported Plugin API version ≥ pluginApiVersion
```

A user on an incompatible build must keep the last compatible installed release. Phials does not replace it with a release that cannot activate.

Do not:

- use “latest Phials” instead of an exact minimum
- raise `minAppVersion` to match the machine used for development
- use the plugin version as `pluginApiVersion`
- declare an older boundary and probe unsupported host behavior

Lowering a boundary widens support. Test the newly included boundary before publishing it.

## Classify and explain the release

A permission expansion is at least a visible feature change. Raising a compatibility boundary can remove the upgrade path for existing users and is normally a breaking change.

Release notes should use explicit sections:

```markdown
### Permissions

- Added `filesystem.write` so Export can create the report and attachments in
  the folder the user chooses. No background writes are performed.

### Compatibility

- Requires Phials 1.6.0 or later because Export uses revision-aware file writes.
- Targets Plugin API 1.1.0.
```

State “No permission changes” or “No compatibility changes” when that helps users verify an update.

## Test the update matrix

Test the exact candidate in an isolated Phials Home:

| Case | Expected result |
| --- | --- |
| Previous release, previous approved permissions | Activates |
| Updated release, changed permission set not reviewed | Does not activate |
| Updated release, current set approved | Activates and gated workflows pass |
| Updated release with one required permission removed | Gated operation fails clearly |
| Phials exactly at `minAppVersion` | Activates |
| Phials below `minAppVersion` | Update is not installed |
| Host supports declared `pluginApiVersion` | Activates |
| Host supports an older Plugin API version | Update is not installed |

Verify the incompatible cases preserve the previous compatible release and its durable data.

Run the broader matrix in [Verify permissions and runtime compatibility](../../test-and-troubleshoot/test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md).

## Avoid coupling permission and data risk

When possible, do not combine a large permission expansion, a raised compatibility boundary, and an irreversible data migration in one release. If they must ship together:

- explain every consequence before publication
- test the combined upgrade from the previous public version
- preserve a recovery path
- keep the old release and migration backup available

Permission approval authorizes supported gated operations. It does not make a migration reversible and does not form a JavaScript sandbox.
