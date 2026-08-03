---
title: "What can plugins add to Phials?"
description: "Surveys author-visible capabilities and routes to the corresponding build hubs without becoming marketing or an API catalog."
ai_disclosure: true
order: 1
---

# What can plugins add to Phials?

Plugins add capabilities to an existing Phials workflow. A plugin can contribute one capability or combine several of them under one identity, release, settings area, and permission set.

Choose the capability that directly produces the outcome you need. The public SDK name in the second column is the typed registration contract you will use after the concept is clear.

| Outcome | Public SDK entry point | Continue with |
| --- | --- | --- |
| Add actions to the Command Bar, Path Bar, context menus, and keyboard shortcuts | [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) | [Add commands](../../add-capabilities/add-commands/index.md) |
| View or edit supported files, optionally with thumbnails and toolbar controls | [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) | [Build file viewers and editors](../../add-capabilities/build-file-viewers-and-editors/index.md) |
| Extract structured information from files and make it available to Phials | [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md) | [Extract file metadata](../../add-capabilities/extract-file-metadata/index.md) |
| Add another presentation of an Explorer tab's current location | [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md) | [Build file views](../../add-capabilities/build-file-views/index.md) |
| Add a tool surface to a left, right, or bottom dock or to a center tab | [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) | [Add panels and tabs](../../add-capabilities/add-panels-and-tabs/index.md) |
| Let users configure plugin behavior | `PhialsPlugin.settings` and optional `settingsComponent` | [Add plugin settings](../../add-capabilities/add-plugin-settings/index.md) |
| Supply a light or dark appearance for Phials | Plugin theme assets | [Create themes](../../add-capabilities/create-themes/index.md) |

These capabilities compose. For example, a plugin for a specialized document format might contribute:

- a file viewing and editing capability for the document itself;
- a file metadata capability for author, revision, and status fields;
- commands for document-specific actions;
- settings for default display behavior.

That is still one plugin. Users install, review, enable, update, and remove it as one artifact.

## Connect capabilities to Phials services

Providers describe what Phials should add. The runtime [Plugin API](../../reference/sdk-type-reference/PluginAPI.md) lets the plugin perform supported work while those capabilities run.

Depending on the workflow, a plugin can:

- work with files and folders through typed, permission-aware operations;
- read the current app or Explorer context exposed by the SDK;
- store configuration, key-value state, or structured plugin data;
- listen for supported Phials events and emit namespaced plugin events;
- open dialogs and show notifications;
- open or focus a center tab supplied by a panel and tab capability.

These are services rather than additional plugin categories. Start with the visible capability, then use only the services it needs. The [Work with Phials](../../work-with-phials/index.md) section covers those shared contracts.

## Choose a focused capability set

A useful first design can be stated in one sentence: “When this file or context is present, the plugin lets the user achieve this outcome.” That statement helps keep registration and permissions narrow.

Before adding another provider, ask:

1. Does this create a distinct user-visible capability, or is it supporting logic for an existing one?
2. Does it belong under the same plugin identity and release lifecycle?
3. Can it reuse the plugin's settings and data without coupling unrelated workflows?
4. Does it require a new permission, and can the user understand why?

Prefer one cohesive plugin with several cooperating providers over several packages that must be installed together. Prefer separate plugins when their purpose, release schedule, trust requirements, or ownership can stand alone.

Next, see [Understand plugins, capabilities, and providers](./understand-plugins-capabilities-and-providers.md) for how these pieces appear in a plugin definition.
