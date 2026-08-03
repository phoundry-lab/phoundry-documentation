---
title: "Verify permissions and runtime compatibility"
description: "Tests the real manifest against requested operations, permission review, minimum Phials version, plugin API version, safe mode, and compatible and incompatible builds."
ai_disclosure: true
order: 4
---

# Verify permissions and runtime compatibility

Test the real release manifest in an isolated Phials Home. Runtime compatibility requires both:

- the running Phials version is at least `minAppVersion`
- the Phials build supports at least the declared `pluginApiVersion`

Permissions and community plugin safe mode are separate trust gates. A compatible plugin still cannot activate while safe mode blocks community plugins or permission review is pending.

## Declare the real boundary

Use explicit versions and the least permission set:

```json
{
	"id": "example.report-tools",
	"name": "Report tools",
	"version": "1.2.0",
	"minAppVersion": "0.1.9",
	"pluginApiVersion": "1.0.0",
	"author": "Example Studio",
	"description": "Build and organize local reports.",
	"permissions": ["filesystem.write"]
}
```

Do not lower a version or omit a permission only to make a test activate. Set each boundary from the public APIs and behavior the plugin actually uses.

Use [Declare Phials and Plugin API compatibility](../../package-and-publish/configure-the-plugin-manifest/declare-phials-and-plugin-api-compatibility.md) and [Request the least plugin permissions](../../package-and-publish/configure-the-plugin-manifest/request-the-least-plugin-permissions.md) when choosing the values.

## Build a permission-operation matrix

List every permission-gated operation and test it with its real manifest:

| Operation | Expected permission |
| --- | --- |
| Read a file or folder | `filesystem.read` or `filesystem.write` |
| Create, modify, rename, or trash a file | `filesystem.write` |
| Read clipboard text | `clipboard.read` |
| Write clipboard text | `clipboard.write` |
| Use `api.fetch` | `network.fetch` |

The exact catalog remains in [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).

For each operation:

1. Install and enable the plugin with the required permission.
2. Approve the displayed permission set.
3. Exercise the real workflow and confirm success.
4. Remove the permission from a development manifest and reinstall.
5. Confirm the operation rejects without performing partial work.
6. Confirm the plugin explains the failure without repeatedly notifying.

The permission wrapper must reject the operation at runtime. A successful TypeScript check does not prove permission approval.

## Test permission changes

Test both directions:

1. Install a release with the original permission set and enable it.
2. Install an update that adds one permission.
3. Confirm the plugin becomes disabled and does not activate before review.
4. Review the complete new set, approve it, and enable the plugin.
5. Exercise the newly gated operation.
6. Install another update that removes the permission and confirm the reduced set is reflected.

Permission order alone is not a change. Adding, removing, or replacing a permission is.

## Test compatible and incompatible versions

Use the starter’s runtime matrix:

| Case | Manifest | Expected result |
| --- | --- | --- |
| Oldest supported Phials | `minAppVersion` equals the running version | Activates |
| Newer compatible Phials | Running version is greater than `minAppVersion` and supports the API version | Activates |
| App too old | `minAppVersion` is greater than the running version | Compatibility failure before activation |
| API too new | `pluginApiVersion` is greater than the supported contract | Compatibility failure before activation |
| Current explicit API | `pluginApiVersion` equals the supported contract | Activates |

For incompatible cases, confirm:

- `main.js` does not activate
- no providers or theme entries become available
- no `onActivate` side effect runs
- the installed plugin shows the compatibility boundary that failed
- lowering the manifest in place is not presented as a user workaround

Always test the oldest Phials release named by `minAppVersion`, not only the current development build.

## Test community plugin safe mode

Use an isolated Phials Home so the test does not disturb normal plugins:

1. Turn off community plugin safe mode.
2. Install, approve, enable, and verify the plugin activates.
3. Turn safe mode on.
4. Confirm the plugin deactivates and its capabilities disappear.
5. Confirm browsing, installation, updates, and enablement are blocked.
6. Turn safe mode off.
7. Confirm the plugin remains installed but requires deliberate enablement before activation.

Safe mode is global. It is not a plugin-specific development mode and does not change the manifest’s permission set.

## Record the runtime evidence

For a release candidate, record:

- plugin version and artifact checksum
- Phials version and supported Plugin API version
- manifest permission set
- safe-mode state
- whether permission review occurred
- installed, enabled, loaded, and activated result
- one representative workflow for every permission
- expected failure result from each incompatible case

Keep the compatible and incompatible manifests as generated test variants; do not publish them as separate releases.

When a gate fails unexpectedly, use [Fix permission and Plugin API failures](../debug-plugin-failures/fix-permission-and-plugin-api-failures.md).
