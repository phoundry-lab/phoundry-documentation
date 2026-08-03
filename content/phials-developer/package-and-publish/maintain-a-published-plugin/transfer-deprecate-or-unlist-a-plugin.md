---
title: "Transfer, deprecate, or unlist a plugin"
description: "Follows registry ownership policy, treats an ID change as a new plugin identity, ships final guidance when useful, and distinguishes unlisting from uninstalling existing copies."
ai_disclosure: true
order: 5
---

# Transfer, deprecate, or unlist a plugin

Choose the path according to what changes: stewardship, support status, or registry availability. Preserve the existing plugin ID whenever the same plugin continues under a new maintainer.

The [community registry policy](https://github.com/EliWimmer/phials-plugins/blob/master/POLICY.md) is the canonical governance contract.

## Transfer the existing plugin

A voluntary transfer requires confirmation from the old owner and acceptance by the new owner.

Before changing the registry:

1. Agree on whether the existing plugin identity and history continue.
2. Transfer or prepare the destination repository.
3. Give the new maintainer access to release, issue, security, and recovery records.
4. Publish or copy no artifacts until ownership is clear.
5. Verify the destination repository’s latest release under the existing plugin ID.

If the GitHub `owner/repo` path changes, the new owner opens a registry pull request updating `repo`. Keep `id` unchanged:

```json
{
  "id": "acme.review-tools",
  "name": "Review Tools",
  "author": "New Maintainer",
  "description": "Adds review commands and file annotations.",
  "repo": "new-maintainer/review-tools"
}
```

Update `author`, `name`, or `description` only when the public listing also changed. Registry maintainers may ask the old owner to confirm the transfer in the pull request.

Before merge, verify:

- the new repository and latest release are publicly accessible
- the manifest and exported plugin still use the registry ID
- release history and licensing permit the transfer
- permissions and compatibility remain accurate
- an existing installation discovers and installs the new repository’s update
- durable settings and data remain under the unchanged ID

Repository transfer does not grant a new permission set. A later permission change still requires permission review.

## Treat an ID change as a new plugin

Do not change the ID merely because the maintainer, repository owner, product name, or organization changed.

If an ID truly must change, Phials treats the result as a separate plugin:

| Contract | Old ID | New ID |
| --- | --- | --- |
| Installed release | Remains installed | Separate install |
| Enabled state | Preserved for old plugin | Independent |
| Permission approval | Preserved for old plugin | Reviewed separately |
| Settings and storage | Old namespace | New namespace |
| Database data | Old namespace | New namespace |
| Update discovery | Old registry entry | New registry entry |

The new plugin cannot read the old plugin’s namespaced data automatically. Provide a supported export/import workflow when users need to carry data forward. Publish migration instructions before unlisting the old ID.

## Deprecate without surprising existing users

Deprecation communicates that support is ending while the listing may remain available for a transition.

Prefer:

1. Publish a final verified release.
2. Explain the support end date and replacement, if any.
3. Describe export, migration, and uninstall choices.
4. Keep the repository, release artifacts, and documentation available during the transition.
5. Unlist when continued discovery is no longer appropriate.

Do not add a broad permission or raise compatibility solely to display a deprecation notice. Do not erase settings or data in the final release. If a replacement exists, describe it as a separate plugin unless it keeps the exact same ID.

The registry does not yet publish replacement or deprecation metadata because
no Phials product surface consumes it. Put transition guidance in the
repository and release notes until that product contract exists.

## Unlist from the registry

Unlisting marks the entry `listed: false` and removes its release projection.
Use the registry command so the reviewed identity remains machine-restorable:

```bash
npm run registry:unlist -- acme.review-tools
npm run validate
```

Use it when:

- a deprecated plugin should no longer be discovered
- the latest release remains broken and correction is delayed
- ownership or policy requirements are no longer satisfied
- registry maintainers confirm malicious or abusive behavior

Unlisting changes distribution, not local state:

```text
registry entry temporarily unlisted
├── new registry installs stop
├── registry update discovery stops
└── installed copies and durable data remain
```

Users control whether to disable or uninstall an installed copy. Uninstall removes release files; the user separately chooses whether to retain or remove settings, storage, and database data.

Do not claim that unlisting:

- remotely disables a plugin
- removes installed JavaScript
- revokes earlier permission approval
- deletes user data
- transfers users to a replacement ID

For an urgent security or abuse report, use the registry’s private reporting path so maintainers can coordinate removal and user guidance.

## Leave a recoverable final state

When possible, keep:

- the final source and license
- immutable release artifacts
- release notes and known-issue status
- migration or export instructions
- a clear archived or maintenance status
- a contact path for security or ownership questions

Archiving a GitHub repository and unlisting it are separate actions. A repository can remain readable after unlisting, and a registry entry should not point to a repository that no longer supplies a valid latest release.

Restore only after publishing a newer immutable candidate:

```bash
npm run registry:restore -- acme.review-tools \
  --inventory /absolute/path/to/release/release-inventory.json \
  --tag v2.0.1
npm run validate:remote
```
