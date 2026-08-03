---
title: "Understand plugins, capabilities, and providers"
description: "Establishes the relationship between one plugin, the capabilities it adds, and the typed providers that register those capabilities."
ai_disclosure: true
order: 2
aliases:
  - plugins/plugin-types
---

# Understand plugins, capabilities, and providers

Use three layers to reason about an integration:

- A **plugin** is the independently packaged artifact Phials installs and loads.
- A **plugin capability** is an outcome that a plugin adds, such as a command, file viewer, file metadata extractor, file view, panel, or tab.
- A **provider** is the typed public SDK object that registers one of those capabilities with Phials.

One plugin can own several providers, including several providers of the same kind. Provider objects do not become separate installed plugins.

## Define the plugin container

The JavaScript entry point exports a [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) definition. Its stable identity, version, lifecycle hooks, settings and database schemas, and `providers` array describe the plugin as a whole.

This minimum definition registers one command:

```ts
export default function createPlugin(): PhialsPlugin {
	let api: PluginAPI | undefined;

	const commands: CommandProvider = {
		type: "command",
		id: "acme.quick-note.commands",
		name: "Quick Note commands",
		commands: [
			{
				id: "acme.quick-note.show-status",
				label: "Show Quick Note status",
				description: "Confirms that the Quick Note plugin is available",
				contextKeys: ["always"],
				action: () => {
					api?.notify.success("Quick Note is ready");
				},
			},
		],
	};

	return {
		id: "acme.quick-note",
		name: "Quick Note",
		version: "1.0.0",
		onActivate(pluginApi) {
			api = pluginApi;
		},
		onDeactivate() {
			api = undefined;
		},
		providers: [commands],
	};
}
```

The plugin ID must match the ID in `manifest.json`. Provider and command IDs are separate stable identities. Namespace them beneath the plugin ID so they do not collide with another plugin:

```text
acme.quick-note
acme.quick-note.commands
acme.quick-note.show-status
```

Run this example from the plugin starter, which supplies the synchronized ambient SDK declarations and build setup. The complete first build and activation workflow is in [Build your first plugin](../build-your-first-plugin/index.md).

## Let each provider describe one capability

Every provider has a `type` discriminator, a stable `id`, a human-readable `name`, and fields specific to the capability it supplies. Phials uses that public contract to place the capability, match it to the current file or context, and pass the documented callback or component props.

The current provider contracts are:

- [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) for commands;
- [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) for file viewing and editing;
- [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md) for file metadata;
- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md) for file views;
- [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) for panels and tabs.

Use the capability guides to construct these objects. Use the [SDK type reference](../../reference/sdk-type-reference/index.md) when you need an exact signature.

A provider should be internally cohesive. If one plugin supports two unrelated file families with different matching, components, and behavior, two [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) objects are usually clearer than one provider with extensive branching. They can still share plugin-level settings, storage, lifecycle hooks, and source modules.

## Understand registration and activation

The `providers` array declares what the plugin contributes. It does not make those capabilities available merely because the release files are installed.

Phials registers the providers as part of successful plugin activation. On deactivation it removes the plugin's providers and other owned runtime registrations. This gives every capability the same enabled state and lifecycle as its containing plugin.

Keep provider construction free of work that needs the live app. Use `onActivate(api)` for startup work that needs the runtime [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), and release retained runtime resources in `onDeactivate()`. Provider callbacks that expose a specialized scope, such as [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md), receive it through the provider's documented method contract.

See [Understand the plugin lifecycle](./understand-the-plugin-lifecycle.md) for the state transitions around registration.

## Separate providers from supporting contracts

Not every public SDK feature is a provider.

- `settings` and `settingsComponent` define user configuration for the whole plugin.
- `database` declares the plugin's structured data schema.
- [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) services perform work such as file operations, storage, events, dialogs, and notifications.
- Lifecycle hooks prepare and clean up the complete plugin.
- Theme assets follow the plugin theme contract rather than appearing in the `providers` array.

These pieces support capabilities; they do not create another installed identity. Keeping that distinction clear makes the plugin easier to explain, test, permission, and maintain.
