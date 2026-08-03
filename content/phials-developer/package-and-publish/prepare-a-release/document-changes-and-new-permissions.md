---
title: "Document changes and new permissions"
description: "Writes useful release notes, calls out compatibility changes, and explains any permission expansion before users encounter review."
ai_disclosure: true
order: 3
---

# Document changes and new permissions

Write release notes before the final candidate review. Notes should tell an existing user what changed, whether they must review permissions, whether their Phials version is supported, and what happens to existing settings or data.

## Use an outcome-first structure

```markdown
## Report tools 1.3.0

### Added

- Export a report and its attachments to a folder you choose.

### Changed

- Large report indexes refresh without blocking the report panel.

### Fixed

- Preserve the selected report after reloading the plugin.

### Permissions

- Added `filesystem.write` so Export can create files in the folder you choose.
  The plugin requests it only when you run Export.

### Compatibility

- Requires Phials 0.1.9 or later.
- Targets Plugin API 1.0.0.

### Settings and data

- Existing settings and report indexes are preserved.
- The first activation upgrades the report index; older plugin releases cannot read the upgraded index.
```

Omit empty change categories, but always include **Permissions**, **Compatibility**, and **Settings and data** when their consequences changed. Write “No permission changes” when that confirmation is useful during an update.

## Explain permission expansion

For every added permission, state:

- the exact permission name
- the user action or capability that needs it
- what data or system resource it accesses
- when the operation occurs
- whether an alternative workflow avoids it

Good:

> Added `network.fetch` to refresh a report from the URL the user configures. The request runs only when the user refreshes or enables scheduled refresh.

Insufficient:

> Added network permission for improvements.

Permission changes require review before activation. Explain the benefit before users encounter the review, and do not hide permission expansion in a general “maintenance” bullet.

Use [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md) for exact names and [Change permissions and compatibility safely](../maintain-a-published-plugin/change-permissions-and-compatibility-safely.md) for update consequences.

## State compatibility changes precisely

Name the changed boundary:

- “Requires Phials 0.1.9 or later.”
- “Now targets Plugin API 1.1.0.”
- “No compatibility changes.”

Do not say only “requires the latest Phials.” If `minAppVersion` increases, explain which new capability requires it.

## Describe settings and data behavior

Call out:

- new settings and their defaults
- renamed, removed, or reset settings
- automatic data migrations
- whether migration is reversible
- whether downgrade remains supported
- data rebuilt or removed during upgrade

Do not promise “no data loss” without testing the upgrade and restart paths. When recovery requires a backup or export, put that action before the change that needs it.

## Keep notes useful and verifiable

Prefer user-visible outcomes over commit summaries or internal class names. Link detailed instructions when a release introduces setup or migration work. Do not include claims that are not represented by the verified candidate.

Use the same final notes as the GitHub release body. A registry entry describes the plugin as a whole; it does not replace version-specific release notes.
