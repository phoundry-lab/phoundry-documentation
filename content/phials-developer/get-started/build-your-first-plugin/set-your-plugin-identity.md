---
title: "Set your plugin identity"
description: "Replaces the example ID, name, version, and manifest identity consistently before local installation."
ai_disclosure: true
order: 2
---

# Set your plugin identity

Give the project its permanent plugin identity before the first local installation. Phials uses the plugin ID to locate release artifacts, store enablement and permission decisions, namespace plugin data, and verify the JavaScript module against its manifest. Changing it later creates a different plugin rather than renaming the installed one.

This article uses:

| Field | Example value |
| --- | --- |
| Plugin ID | `acme.hello-phials` |
| Name | `Hello Phials` |
| Version | `0.1.0` |
| Author | `Acme` |
| Repository | `https://github.com/acme/hello-phials` |

Replace the example values with your own. A plugin ID is a lowercase vendor and plugin name separated by a period, such as `acme.hello-phials`. It must match `^[a-z][a-z0-9]*\.[a-z][a-z0-9-]*[a-z0-9]$`. The `phials.` namespace is reserved.

## Update the package and manifest

Set the npm project name and version in `package.json`:

```json
{
  "name": "hello-phials",
  "version": "0.1.0",
  "private": true,
  "type": "module"
}
```

Keep the existing scripts and dependencies in the file. The build reads `package.json` as the source of the release version.

Then replace `public/manifest.json` with your plugin metadata:

```json
{
  "id": "acme.hello-phials",
  "name": "Hello Phials",
  "version": "0.1.0",
  "minAppVersion": "0.1.0",
  "pluginApiVersion": "1.0.0",
  "author": "Acme",
  "description": "Adds a small hello command and example file viewer to Phials.",
  "repository": "https://github.com/acme/hello-phials",
  "permissions": []
}
```

`version` remains in the source manifest so the file is understandable on its own, but the build synchronizes it from `package.json` when it writes `dist/manifest.json`. `minAppVersion` names the oldest Phials release you support. `pluginApiVersion` names the public SDK contract you target. They are different compatibility boundaries; the dedicated [version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md) explains how to choose them for a release.

The starter's command and notification APIs require no plugin permissions, so leave `permissions` empty for this tutorial.

## Update the plugin definition

In `src/main.ts`, replace every `example.community-demo` namespace with `acme.hello-phials`, then update the plugin and provider names. The important identity-bearing parts should read:

```ts
const helloCommand: Command = {
	id: "acme.hello-phials.hello",
	label: "Hello from Phials",
	description: "Shows a notification from the Hello Phials plugin",
	icon: "mdi:hand-wave",
	category: "View",
	contextKeys: ["always"],
	action: () => {
		api?.notify.success("Hello from acme.hello-phials");
	},
};

const commandProvider: CommandProvider = {
	type: "command",
	id: "acme.hello-phials.commands",
	name: "Hello Phials commands",
	commands: [helloCommand],
};

const previewProvider: PreviewProvider = {
	type: "preview",
	id: "acme.hello-phials.preview",
	name: "Hello Phials file viewer",
	canHandle: (file) => file.name.endsWith(".phials-demo-preview.txt"),
	thumbnail: ExamplePreview,
	surface: ExamplePreview,
	destinations: { pageTab: true },
};
```

The returned plugin definition must use the same identity and version:

```ts
return {
	id: "acme.hello-phials",
	name: "Hello Phials",
	version: "0.1.0",
	onActivate: (pluginApi: PluginAPI) => {
		api = pluginApi;
		pluginApi.notify.info("acme.hello-phials activated");
	},
	onDeactivate: () => {
		api = null;
	},
	providers: [commandProvider, previewProvider],
};
```

Keep the existing `createPlugin` function, `api` variable, CSS import, component import, and default export around these blocks. Provider and command IDs are namespaced beneath the plugin ID so they remain unique when several plugins are activated.

The starter's artifact validator derives the expected ID, name, and version from the source manifest and package metadata. You do not need to put your plugin ID in a validation script.

## Check for leftover starter identity

From the project root, search the authored project files:

```bash
rg -n 'example\.community-demo|Community plugin example|phials-plugin-example' \
  package.json public src scripts
```

The command should produce no output. References inside `.git/`, historical commits, or the generated `dist/` directory do not describe the current source. Rebuild `dist/` in the next step instead of editing it.

For a detailed explanation of every manifest field, continue later to [Configure the plugin manifest](../../package-and-publish/configure-the-plugin-manifest/index.md). For now, [build and run your plugin locally](./build-and-run-your-plugin-locally.md).
