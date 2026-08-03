---
title: "Collect diagnostics for unresolved failures"
description: "Gathers plugin identity and versions, manifest, activation errors, console output, reproduction steps, and privacy-reviewed diagnostic details."
ai_disclosure: true
order: 6
---

# Collect diagnostics for unresolved failures

A useful diagnostic report lets another plugin author reproduce the failure
without receiving the user's files, credentials, clipboard contents, or entire
Phials Home. Capture the smallest report before restarting, resetting data, or
installing a different release.

## Start with the generated diagnostic report

Open **Settings → Plugins → Community plugins → Installed**, open the affected
plugin's actions, and choose **Copy diagnostics**. The report contains:

- plugin name, ID, and installed version;
- Phials version, platform, and supported Plugin API version;
- installed, enabled, loaded, and activated state;
- community plugin safe-mode and permission-review state;
- declared minimum Phials version, Plugin API version, and permissions;
- the latest load, activation, or reload error; and
- release-artifact validation results.

The generated report excludes plugin settings values, key-value storage,
database rows, file contents, clipboard contents, network payloads, and
credentials. Review it anyway before sharing; plugin IDs, paths in error stacks,
and third-party error messages may identify a person or project.

Use the stable code to route the first failing boundary:

| Code | Boundary |
| --- | --- |
| `PLUGIN_MANIFEST_INVALID` | Installed manifest or identity |
| `PLUGIN_PERMISSION_REVIEW_REQUIRED` | Enablement and permission approval |
| `PLUGIN_COMPATIBILITY_FAILED` | App or Plugin API compatibility |
| `PLUGIN_CANDIDATE_CHECKSUM_MISMATCH` | Installed candidate bytes |
| `PLUGIN_RELEASE_ASSET_MISMATCH` | Registry and GitHub release inventory |
| `PLUGIN_MODULE_LOAD_FAILED` | ES-module import |
| `PLUGIN_DEFINITION_INVALID` | Plugin or provider shape |
| `PLUGIN_CSS_UNSAFE` | Global CSS scope or host-token override |
| `PLUGIN_ACTIVATION_FAILED` | Capability registration or lifecycle |
| `PLUGIN_ROLLBACK_FAILED` | Restoration of the prior working release |

If the plugin cannot be discovered, run the starter validator and begin a
manual report with the source manifest instead.

## Add one exact reproduction

Write the shortest sequence that still fails:

```text
Plugin: com.example.review-tools 1.4.2
Phials: 1.8.0
Starting state: installed, enabled, activated; permissions approved

1. Open a Workspace Folder.
2. Select one local Markdown file.
3. Run “Create review summary” from the Command Bar.

Expected: a summary tab opens.
Actual: the command reports “filesystem.read permission denied.”
Frequency: 3 of 3 attempts after plugin reload.
Control: the command works with a new empty Markdown file in another folder.
```

Name the visible command, view, panel, tab, or setting. Include whether the
failure survives **Reload**, a Phials restart, a new plugin instance, or a
representative control file. Do not replace exact steps with “it sometimes
breaks.”

## Attach build and runtime evidence

From the plugin project, capture the command and the first failure:

```bash
npm run check
npm run build
npm run validate
```

Include:

- the first relevant type-check or build error, not only the final summary;
- complete validator output;
- the exact installed `manifest.json`, after privacy review;
- the first plugin-owned stack frame and its error message;
- whether the failure occurs during load, activation, provider selection,
  component render, or a user action; and
- a minimal source reproduction when the failure is in plugin code.

Do not paste an unlimited console transcript. Reproduce once in a clean console,
then include the initiating action, the first error, the plugin-owned frames,
and a small amount of surrounding context. Repeated secondary errors usually
obscure the original boundary.

## Describe data by shape, not private contents

When persisted data matters, report:

- the owning contract: settings, storage, database, or module instance state;
- schema or data format version;
- key names and value types;
- table names, column names, row counts, and relevant constraint names;
- whether a fresh value or instance works; and
- the narrow recovery action already attempted.

Prefer:

```text
storage key "sync-cursor": object, version field is number 1
expected: object, version 2, updatedAt string
```

over the full stored value. For file-dependent failures, provide extension,
MIME type, approximate size, and a synthetic sample that reproduces the issue.
Do not attach the user's original document unless they explicitly reviewed and
approved it for sharing.

## Perform a privacy review

Remove or replace:

- user names, home-directory names, and full local paths;
- client, employer, repository, Workspace Folder, and file names;
- file contents and extracted metadata values;
- access tokens, cookies, authorization headers, private keys, and credentials;
- clipboard contents;
- network request bodies and private response data;
- plugin setting values that contain paths or account information; and
- storage values and database rows not required by the minimal reproduction.

Use consistent placeholders such as
`/Users/example/Projects/sample/document.md` so related paths remain
understandable. Never share an entire Phials Home, configuration directory,
session file, or plugin database as a default diagnostic step.

## Finish with a boundary statement

End the report with the narrowest confirmed facts:

```text
Confirmed:
- dist validation passes.
- the installed plugin activates after reload.
- the command is available for the selected file.
- the failure begins at the first api.files read.

Not yet confirmed:
- whether the permission approval persisted after the update.
- whether the failure reproduces on another platform.
```

This separation prevents a plausible explanation from becoming an assumed
fact. It also tells the next investigator which test has the highest
information value.

The report is ready when another author can identify the lifecycle or runtime
boundary, reproduce the same symptom with non-private inputs, and see exactly
which recovery actions have already been tried.
