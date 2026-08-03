---
title: "Verify the published installation"
description: "Installs through the same registry and latest-release path users receive and verifies compatibility, permission review, activation, capabilities, and optional assets."
ai_disclosure: true
order: 3
---

# Verify the published installation

Use a clean Phials Home to prove that the merged registry entry and public
latest stable release work without a source checkout, development installer, or
previous permission approval. This is the first test of the complete user
distribution path.

## Confirm the public inputs

Before opening Phials, confirm:

- the registry entry is present on the registry's default branch;
- its `id` and `repo` are correct;
- the GitHub repository's latest stable release is the intended tag;
- the attached release assets still match the verified inventory; and
- `manifest.json.version` equals the normalized release tag.

Do not begin with a profile that already has a locally installed copy under the
same ID. Existing release files, trust state, settings, or data can make an
incorrect public installation appear healthy.

## Start from an isolated Phials Home

Choose a new empty directory and launch the compatible Phials build with that
directory as `PHIALS_HOME`:

```bash
PHIALS_HOME=/absolute/path/to/published-plugin-test phials
```

Use a separate directory for each release verification. The test profile should
contain no development artifact and no prior approval for the plugin ID.

Record:

- Phials version and supported Plugin API version;
- operating system;
- plugin ID and expected version;
- latest GitHub release URL; and
- expected permission set and capabilities.

## Discover and install through Phials

In Phials:

1. Open **Settings → Plugins → Community plugins**.
2. Turn off **Community plugins safe mode** and accept the trust warning for
   this isolated profile.
3. Refresh the Community list.
4. Find the plugin by its registry name and ID.
5. Confirm its author and description match the submitted entry.
6. Choose **Install**.

The install must resolve through:

```text
registry entry
→ GitHub owner/repo
→ latest stable release
→ exact manifest.json and main.js assets
→ installed plugin
```

The Installed card should show the manifest version from the public release.
If installation succeeds only after copying local files, the published path has
not passed.

## Verify compatibility and permission review

Before enabling, confirm the installed manifest reports the intended:

- minimum Phials version;
- Plugin API version; and
- complete plugin permission set.

If the release requests permissions, choose **Enable** and verify that Phials
shows the complete permission review before any capability activates. Read each
permission description, then approve the set for this test.

Expected results:

- a compatible Phials build permits enablement after review;
- denying review leaves the plugin disabled;
- approval applies only to the exact current permission set; and
- no capability runs while safe mode, incompatibility, or review blocks
  activation.

Compatibility boundary and permission-expansion variants belong in the release
candidate matrix. The published test confirms that the real public manifest
produces the same result.

## Confirm loading, activation, and capabilities

Enable the plugin and distinguish the runtime states:

1. the release files are present, so the plugin is **installed**;
2. the user preference allows it to run, so it is **enabled**;
3. Phials imports `main.js`, so it is **loaded**; and
4. Phials accepts the plugin definition, registers its providers, and completes
   activation, so it is **activated**.

Confirm there is no activation error. Then run one normal workflow for every
advertised capability:

- execute each command group from its documented discovery surface;
- open representative files for each file viewing or editing capability;
- inspect one extracted file-metadata value;
- switch to each contributed file view;
- open, move, close, and restore each panel or tab capability;
- change and reset one plugin setting; and
- select every contributed theme mode.

Test the plugin's permission-gated operations, not only a notification or
static interface.

## Verify optional assets

Optional files need their own visible checks:

- If `styles.css` is attached, inspect every plugin interface in light and dark
  modes and confirm the installed release is styled without source CSS.
- For each theme, confirm both `theme-<slug>.json` and
  `theme-<slug>.css` were attached, the theme appears by its intended name and
  mode, and selecting it applies the expected tokens.
- Confirm an omitted optional asset does not leave a broken selector, unstyled
  component, or partial theme.

Theme assets are installed from attached release assets. A raw-tag fallback for
`manifest.json` and `main.js` does not prove theme distribution works.

## Restart and repeat the primary workflow

Quit Phials completely, reopen it with the same isolated `PHIALS_HOME`, and
verify:

- the plugin remains installed and enabled;
- no permission review repeats for the unchanged set;
- activation completes without an error;
- intended settings and plugin data remain;
- intended panel or tab instance state restores; and
- the primary capability workflow still succeeds.

This restart separates durable contracts from state that survived only in the
first process.

## Record the publication result

Record a pass or failure for:

| Boundary | Evidence |
| --- | --- |
| Registry | Entry visible with correct ID, repository, author, and description |
| Latest release | Public tag and downloaded asset checksums match the candidate |
| Installation | Installed card shows the expected plugin version |
| Trust | Safe mode and permission review block activation as expected |
| Compatibility | Public manifest is accepted by the tested compatible build |
| Activation | No load or activation error |
| Capabilities | One representative workflow passes per capability |
| Optional assets | Styles and every theme pair load from the release |
| Restart | Activation and intended durable state survive a full restart |

If any boundary fails, preserve its exact message and public URLs. Use
[Debug plugin failures](../../test-and-troubleshoot/debug-plugin-failures/index.md)
to isolate the fault.

Do not patch the assets under the existing version. Publish a verified newer
release for artifact or code failures; use a focused registry pull request for
an incorrect entry. Publication is complete only when this clean-profile
installation passes end to end.
