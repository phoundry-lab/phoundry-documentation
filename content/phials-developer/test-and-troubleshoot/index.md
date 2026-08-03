---
title: "Test and troubleshoot"
description: "Run, validate, and troubleshoot plugins before and after release."
ai_disclosure: true
---

# Test and troubleshoot

A successful build proves that the project compiles. A releasable plugin must also install, pass compatibility and permission checks, activate, preserve the right state, and behave correctly in its supported Phials contexts.

- [Run your plugin locally](./run-your-plugin-locally/index.md) establishes a repeatable install, rebuild, reload, restart, and persistence workflow.
- [Test and validate your plugin](./test-and-validate-your-plugin/index.md) covers source checks, logic and interface tests, release-artifact validation, permissions, and compatibility.
- [Debug plugin failures](./debug-plugin-failures/index.md) starts from visible symptoms and works through the least-cost checks for loading, capabilities, rendering, permissions, and data.

Run the full release-candidate checklist under [Prepare a release](../package-and-publish/prepare-a-release/index.md) against the exact artifacts you plan to publish.
