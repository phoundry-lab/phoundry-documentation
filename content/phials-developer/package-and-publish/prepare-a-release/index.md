---
title: "Prepare a release"
description: "Version, build, document, and verify the exact artifacts for a plugin release."
ai_disclosure: true
---

# Prepare a release

Prepare one complete, versioned set of release artifacts and verify those exact files before publication. The community registry points Phials to the plugin repository; Phials installs the repository’s latest GitHub release.

Work through the release gate in order:

1. [Choose a plugin release version](choose-a-plugin-release-version.md) from the compatibility and user-visible change.
2. [Build a complete release artifact set](build-a-complete-release-artifact-set.md) with aligned identity and version.
3. [Document changes and new permissions](document-changes-and-new-permissions.md) before users encounter the update.
4. [Verify a release candidate](verify-a-release-candidate.md) from source checks through installed workflows and restart.

The release candidate is the exact set of files that will be attached to the GitHub release. If source, metadata, dependencies, generated SDK files, or any artifact changes after verification, build a new candidate and repeat the gate.

## Release outcome

A ready candidate has:

- one semantic plugin version shared by package metadata, manifest, exported plugin, tag, and release
- `manifest.json` and `main.js`, plus only supported optional artifacts
- release notes that state permission, compatibility, settings, and data consequences
- a recorded clean source, artifact, installation, activation, restart, and representative-workflow result
- checksums for the files intended for publication

Publication begins only after the candidate is a clear go. Continue with [Publish your plugin](../publish-your-plugin/index.md).
