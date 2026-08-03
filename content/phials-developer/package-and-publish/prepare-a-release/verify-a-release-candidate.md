---
title: "Verify a release candidate"
description: "Runs the established source, artifact, permission, compatibility, install, activation, restart, and representative-workflow checks against the exact files intended for publication."
ai_disclosure: true
order: 4
---

# Verify a release candidate

Make the go/no-go decision against one immutable artifact inventory. Verify source, artifacts, installation, activation, restart, and representative workflows in that order.

## Record the candidate

Start from a clean checkout of the intended release commit:

```bash
npm ci
npm run sdk:verify
npm run check
npm run test:run
npm run build
npm run validate
npm run release:inventory
npm run release:verify
```

Record:

- commit
- plugin version
- artifact filenames and SHA-256 checksums
- manifest permissions
- `minAppVersion` and `pluginApiVersion`
- dependency lockfile state

Do not change or rebuild `dist/` after recording the inventory.

## Apply the go/no-go checklist

### Source

- [ ] The release commit is reviewed and the worktree is clean.
- [ ] Dependencies install from the committed lockfile.
- [ ] The synchronized SDK matches `pluginApiVersion`.
- [ ] Type checks and deterministic tests pass.
- [ ] Release notes match the candidate’s behavior.

### Artifacts

- [ ] `npm run validate` passes without release-blocking warnings.
- [ ] `manifest.json` and `main.js` are present.
- [ ] Only supported optional CSS and theme assets are present.
- [ ] Package, manifest, exported plugin, tag, and release versions match.
- [ ] IDs match across registry entry, manifest, exported plugin, and install directory.
- [ ] The artifact inventory is recorded and unchanged.
- [ ] `npm run release:verify` passes without changing the candidate.

### Installation and activation

Install the exact candidate into an isolated Phials Home:

```bash
npm run dev:install -- --phials-home /absolute/path/to/release-candidate-home
```

- [ ] Installation succeeds without using source files.
- [ ] Safe mode blocks enablement as expected.
- [ ] The complete permission set is shown and reviewed.
- [ ] The plugin advances through installed, enabled, loaded, and activated states.
- [ ] Every expected provider, theme, setting, or interface appears.
- [ ] No activation error or unexpected notification remains.

### Restart and durable state

- [ ] Disable and re-enable preserve intended settings and data.
- [ ] Plugin reload preserves only the state its lifecycle contract promises.
- [ ] A full Phials restart activates the plugin and restores intended durable state.
- [ ] An update from the previous public release migrates existing settings and data.
- [ ] A failed migration or activation remains recoverable.

### Representative workflows

- [ ] One normal workflow passes for every plugin capability.
- [ ] Every permission-gated operation passes with the declared permission.
- [ ] Cancellation, empty state, malformed input, and one expected failure are handled.
- [ ] Svelte interfaces work with keyboard navigation, visible focus, light and dark themes, narrow placement, and increased text size.
- [ ] Representative files include the smallest valid, typical, malformed, and unsupported cases.

### Compatibility

- [ ] The oldest Phials version allowed by `minAppVersion` passes.
- [ ] A current compatible Phials build passes.
- [ ] An app-too-old manifest variant is rejected before activation.
- [ ] An API-too-new manifest variant is rejected before activation.
- [ ] A permission-expansion update remains disabled until review.

Use [Verify permissions and runtime compatibility](../../test-and-troubleshoot/test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md) for the full matrix.

## Decide go or no-go

The candidate is a **go** only when every applicable item passes against the recorded artifacts.

It is a **no-go** when:

- a check is skipped without an accepted reason
- any version, ID, permission, compatibility field, checksum, or release note differs
- activation or a representative workflow fails
- the oldest declared compatible Phials version is not available for testing
- a migration or permission expansion has no recovery evidence
- a release artifact was rebuilt or edited after installation testing

Fix the source or metadata, choose a new candidate, and repeat the complete gate. Do not patch files in the GitHub release UI.

## Hand off the verified files

Keep the release commit, notes, and artifact inventory together. The publication step must attach files whose checksums match the go decision.

Continue with [Publish a GitHub release](../publish-your-plugin/publish-a-github-release.md), then [Verify the published installation](../publish-your-plugin/verify-the-published-installation.md) through the registry and latest-release path users receive.
