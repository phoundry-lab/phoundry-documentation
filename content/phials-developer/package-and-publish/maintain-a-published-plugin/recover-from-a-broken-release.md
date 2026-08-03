---
title: "Recover from a broken release"
description: "Diagnoses a broken latest release, restores a good install source through a fixed newer release or temporary unlisting, and communicates impact."
ai_disclosure: true
order: 4
---

# Recover from a broken release

Restore a safe latest-release path with a newer verified release. If that cannot happen quickly, request temporary unlisting so new registry-based installs and updates stop discovering the broken source.

Do not replace assets, move a tag, or edit an existing release into a different build. Preserve the failed release as evidence and publish the correction under a newer plugin version.

## Confirm what is broken

Check the same public path Phials uses:

1. Open the repository’s latest GitHub release.
2. Confirm its tag is the intended plugin version.
3. Download the public `manifest.json`, `main.js`, and optional artifacts.
4. Compare their checksums with the verified release inventory.
5. Run release validation against those downloaded files.
6. Test a clean install and an upgrade from the previous public release.

Classify the failure:

| Failure | Typical evidence |
| --- | --- |
| Publication | missing, renamed, mismatched, or stale release artifacts |
| Manifest | invalid ID, version, permission, or compatibility metadata |
| Load or activation | module import, default export, lifecycle, or registration failure |
| Workflow | plugin activates but a user outcome is broken |
| Migration | existing settings or data cannot move forward safely |
| Compatibility | declared minimum is lower than the runtime behavior actually requires |
| Security or abuse | release behavior creates an immediate trust or safety concern |

Use [Debug plugin failures](../../test-and-troubleshoot/debug-plugin-failures/index.md) to isolate runtime symptoms.

## Contain immediate impact

If the release can cause harmful operations or data damage:

- contact registry or Phials maintainers through the private security-report path
- ask affected users to disable the plugin or enable community plugin safe mode
- tell users whether uninstalling should retain data for recovery
- avoid publishing sensitive exploit details before maintainers coordinate containment

Registry removal is not remote revocation. Installed copies remain until users disable or uninstall them.

## Publish a corrective release

Create a newer semantic version:

```text
broken latest: 1.4.0
corrective release: 1.4.1
```

The correction can restore the previous good code, apply a narrow fix, or repair manifest and artifact construction. It still needs the complete release gate:

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

Verify:

- clean installation
- upgrade from the last good public version
- upgrade or recovery from the broken version when safe
- permission and compatibility behavior
- settings and data integrity
- activation and restart
- the workflow that failed publicly

Publish the new immutable release and confirm GitHub returns it as latest. Do not mark an older release as latest or reuse version `1.4.0`.

## Request temporary unlisting when needed

If a safe correction cannot be published quickly, use the registry's
machine-supported unlisting command and open a pull request:

```bash
npm run registry:unlist -- acme.review-tools
npm run validate
```

This retains the reviewed plugin record with `listed: false` while removing its
release projection, so restoration does not require inventing a new identity.

Temporary unlisting:

- removes the plugin from registry discovery
- stops new registry-based installs
- stops registry-based update discovery
- leaves already-installed release files and durable data in place
- does not disable or uninstall existing copies

Keep the repository and issue or advisory available so affected users can understand status and recovery. For a security incident, follow the registry’s private-report policy before public discussion.

## Restore the listing

Before restoring a temporarily removed entry:

1. Publish a newer verified good release.
2. Confirm it is the repository’s latest release.
3. Test the public artifacts through clean-install and upgrade paths.
4. Restore the same registry ID and repository path.
5. Restore from the new starter inventory, validate remotely, and open the
   restoration pull request:

   ```bash
   npm run registry:restore -- acme.review-tools \
     --inventory /absolute/path/to/release/release-inventory.json \
     --tag v1.4.1
   npm run validate:remote
   ```

6. Verify the published installation after the registry update is live.

If the repository or owner also changed, follow [Transfer, deprecate, or unlist a plugin](transfer-deprecate-or-unlist-a-plugin.md).

## Communicate the incident

State:

- affected plugin versions
- visible symptoms and data risk
- whether users should disable, update, retain data, or uninstall
- the fixed version
- whether migration or manual recovery is required
- whether the registry listing is temporarily unavailable

Do not describe unlisting as uninstalling users’ copies, and do not claim that a corrective artifact automatically reverses data changes made by the broken release.

The [community registry policy](https://github.com/EliWimmer/phials-plugins/blob/master/POLICY.md) is canonical for takedown and broken-release handling.
