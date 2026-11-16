---
title: "Publish a plugin update"
description: "Prepares and verifies a newer release, preserves stable identity, updates the registry only when its entry changes, and tests the installed upgrade path."
ai_disclosure: true
order: 1
---

# Publish a plugin update

Publish a newer verified GitHub release under the existing plugin ID, then test the upgrade from the previous public release.

The community registry resolves the repository’s latest GitHub release. It does not store the current plugin version, so an ordinary code or content update does not need a registry pull request.

## Start from the previous public contract

Before changing code, record:

- current plugin version
- current permissions
- current `minAppVersion` and `pluginApiVersion`
- public capability and setting IDs
- durable settings, storage, and database versions
- the release currently returned as latest

Classify compatibility from what existing users experience. A new capability can be backward-compatible; removing or renaming an identifier, dropping a supported workflow, or making old data unreadable is not.

Use [Choose a plugin release version](../prepare-a-release/choose-a-plugin-release-version.md) to select the next version.

## Preserve release identity

Keep the existing plugin ID everywhere:

```text
registry entry
manifest.json
default PhialsPlugin export
installed plugin
```

Changing repository ownership does not require a new plugin ID. Changing the ID creates a new plugin and does not update existing installations.

Keep the registry entry unchanged unless one of its listing fields changes:

| Change | Registry pull request? |
| --- | --- |
| Plugin version, code, permissions, or compatibility | No |
| GitHub release notes or release artifacts | No |
| Registry `name`, `author`, or `description` | Yes |
| Repository path in `repo` | Yes |
| Plugin ID | New plugin identity and coordinated registry change |

## Prepare the exact update

Run the complete release gate:

```bash
npm ci
npm run check
npm test
npm run build
npm run release:verify
```

`npm test` runs the starter tests once using Node’s test runner. The build
emits both `dist/manifest.json` and `release/release-inventory.json` from the
bundled manifest. `release:verify` checks exact candidate bytes and the full
emitted manifest against that bundle; it does not rebuild, run a sandbox, or
audit CSS policy.

Bump only `package.json.version` (for example,
`npm version patch --no-git-tag-version`). The source manifest imports that
value. When updating the SDK, install the intended exact package version and
review its public contract; there is no copied SDK folder to synchronize.

Write release notes that call out:

- user-visible additions, changes, and fixes
- permission changes
- minimum Phials or Plugin API changes
- settings and data migration behavior
- downgrade or recovery limits

Follow [Prepare a release](../prepare-a-release/index.md) for the complete version, artifact, notes, and candidate workflow.

## Test the installed upgrade path

Use an isolated Phials Home:

1. Install the previous public release through its normal artifact path.
2. Enable and activate it.
3. Create representative settings, key-value data, database rows, and plugin-owned files.
4. Install the candidate as an update without clearing the old data. For a
   frozen local candidate, copy the existing `dist/` files into
   `<test-home>/plugins/<plugin-id>/` using the supported installed layout.
   Do not run `dev:install`: it builds again before installing. Its default
   destination is the normal Phials Home, not an isolated test Home.
5. Complete permission review if the exact permission set changed.
6. Confirm the plugin loads and activates.
7. Verify migration results and every representative capability.
8. Restart Phials and verify durable state again.

Also test a user who has the plugin installed but disabled. The update must not treat enablement as permission to activate it.

The installer replaces release artifacts as one set and retains the previous set until the updated plugin activates successfully. If activation fails, Phials restores the previous installed release. Do not rely on that artifact rollback to reverse a migration; durable-state migrations need their own recoverable contract.

## Publish a new immutable release

Create a new tag and GitHub release. Attach the exact artifacts whose checksums passed candidate review.

Do not:

- replace files on the previous release
- reuse or move a published tag
- publish a lower version as a rollback
- attach files rebuilt after verification

Phials compares the latest release version with the installed manifest version. A fix for a released version therefore needs a newer semantic version.

## Verify the public update

After publication:

1. Confirm GitHub returns the intended release as latest.
2. Confirm every attached artifact matches the recorded checksum.
3. Check for updates from an installation of the previous version.
4. Install through the registry path.
5. Repeat activation, migration, permission, restart, and representative-workflow checks.

If the public result differs from the candidate, stop promoting the release and follow [Recover from a broken release](recover-from-a-broken-release.md).
