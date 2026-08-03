---
title: "Fix missing or unavailable plugin capabilities"
description: "Checks provider registration, matching, context, placement, priority, and activation without asking authors to inspect host registries."
ai_disclosure: true
order: 2
---

# Fix missing or unavailable plugin capabilities

Start here when the installed plugin is activated but one of its commands, file
viewers or editors, metadata fields, file views, panels, or tabs is absent or
unavailable. The useful question is not merely “was the provider registered?”
but “is this provider eligible in the exact context where I am looking?”

## Confirm activation and the current build

Open the installed plugin card first. It should show Enabled with no permission
review, incompatibility, or activation error. If it does not, use
[Fix a plugin that will not load or activate](./fix-a-plugin-that-will-not-load-or-activate.md).

Next, make a visible change to the missing provider's label, rebuild, reinstall,
and choose **Reload**. If the old label remains elsewhere, Phials is still
running the previous release. If the new label appears, the current build is
activated and you can investigate eligibility.

## Check the provider definition

Every capability must be present in the exported plugin's `providers` array:

```ts
const plugin: PhialsPlugin = {
	id: "com.example.review-tools",
	name: "Review Tools",
	version: "1.0.0",
	providers: [
		reviewCommands,
		reviewPreview,
		reviewMetadata,
		reviewView,
		reviewPanel,
	],
};
```

Verify that:

- the provider has the intended public `type`;
- its ID is stable and unique within the plugin;
- the imported object is the provider you edited; and
- constructing the provider does not depend on a Plugin API that is bound only
  during activation.

Use the current provider types: `command`, `preview`, `metadata`, `view`, and
`module`. A plugin can combine several provider types.

## Diagnose the capability from its context

| Visible symptom | Likely cause | Next action | Expected result |
| --- | --- | --- | --- |
| A command is absent everywhere | Its provider is not exported, its `contextKeys` fail, or `when` returns `false` | Search in a context that satisfies the command, then temporarily use `contextKeys: ["always"]` and omit `when` | The command appears in the Command Bar |
| A command appears in search but not a menu or path bar | Its placement is missing or its placement-specific condition does not match | Add the intended public placement and test in the target surface | The same command appears in both search and the placement |
| A command is visible but disabled | `disabled(ctx)` returns `true` | Display or log the predicate inputs and reproduce the correctable condition | The command becomes executable without changing identity |
| A viewer or editor does not open for a file | Extension, MIME, category, `canHandle`, destination, or priority excludes it | Test one representative file against the narrow matching criteria | The provider is selected for eligible files and falls through for others |
| A metadata field or column is absent | File matching failed, extraction returned no namespaced value, or column policy hides it | Confirm extraction for one file and request the field explicitly in Details | The namespaced field appears with the extracted value |
| A file view is absent | It is restricted to Workspace Folders or has not declared availability in the current context | Test in the intended ordinary folder or Workspace Folder and review the provider's availability fields | The view appears only in the declared contexts |
| A panel is absent from a dock or the center | The position is not in `allowedPositions` | Include the intended position and provide a valid `defaultPosition` | The panel can be added in that position |
| A second panel or tab focuses the first | `allowMultiple` is false, or center-tab identity intentionally matches | Enable multiple instances or return a distinct stable identity for distinct content | A new instance opens only when its identity is genuinely different |

These checks use public provider contracts only. The visible capability and its
documented inputs are sufficient; plugin authors do not need to inspect host
registration structures.

## Test matching before changing priority

For file viewing and metadata, priority matters only after a provider is
eligible. Confirm matching first:

- extensions are lowercase and omit the leading period;
- MIME types are complete values;
- directories are rejected when the capability expects files;
- `canHandle` is synchronous, deterministic, and returns `true` for the test
  file; and
- the provider declares the destination where you expect it to appear.

Then compare priority with other eligible providers. Increase it only when this
provider is intentionally more specific. An extreme priority cannot make a
nonmatching provider eligible and can cause it to capture files it cannot
render.

See [Match files to a viewer or editor](../../add-capabilities/build-file-viewers-and-editors/match-files-to-a-viewer-or-editor.md)
for a complete matching example.

## Test context without removing the product rule

For commands, use a temporary always-available diagnostic state to separate
registration from context:

```ts
const diagnoseCommand: Command = {
	...reviewSelectionCommand,
	contextKeys: ["always"],
	when: undefined,
	disabled: undefined,
};
```

If the command appears, registration is healthy and the fault is in
availability. Restore the intended rule, then inspect `selectedFiles`,
`targetFile`, `currentPath`, Workspace Folder state, and the active context keys
through the documented [CommandContext](../../reference/sdk-type-reference/CommandContext.md). Keep availability callbacks
synchronous and side-effect free.

Use the same reduction for interface capabilities: render a static heading
before adding data reads, filters, or state restoration. If the heading appears,
the provider is selected and the missing result belongs to its component or
data path.

## Recover an unavailable restored tab

A restored center tab can remain as **Module unavailable** when the plugin is
disabled, uninstalled, or its provider ID changed. Re-enable or reinstall the
same plugin ID and provider ID, then reload. Phials can reconnect the saved
instance when the original identity returns.

Do not create a new provider ID for a label change or ordinary refactor. Stable
IDs preserve command customization, saved layouts, and panel or tab instances.

The investigation is complete when the provider appears in every declared
context, remains absent where it is not eligible, and still behaves correctly
after a plugin reload.
