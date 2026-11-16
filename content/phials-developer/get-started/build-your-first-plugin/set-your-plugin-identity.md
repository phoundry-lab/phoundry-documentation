---
title: "Set your plugin identity"
description: "Sets a stable plugin ID and public metadata, with package.json as the single source of the plugin version."
ai_disclosure: true
order: 2
---

# Set your plugin identity

Choose your plugin's identity before installing it. Phials uses the ID to locate the plugin and associate its settings, data, and permission decisions. Changing the ID creates a different plugin rather than renaming the installed one.

This tutorial uses `acme.hello-phials` and the name **Hello Phials**. Replace those values with your own.

## Set the package name and version

Edit these fields in `package.json`, keeping its scripts and dependencies:

```json
{
  "name": "hello-phials",
  "version": "0.1.0",
  "private": true,
  "type": "module"
}
```

`package.json` is the single source of the plugin version. The source manifest imports it; you do not need to update a second version field.

## Set the manifest metadata

Edit `src/plugin.manifest.ts`:

```ts
import { definePluginManifest } from "@phoundry/phials-plugin-sdk/manifest";
import { version } from "../package.json";

export const pluginManifest = definePluginManifest({
  id: "acme.hello-phials",
  name: "Hello Phials",
  version,
  minAppVersion: "0.1.0",
  pluginApiVersion: "3.0.0",
  author: "Acme",
  description: "Adds a hello command and example file preview to Phials.",
  repository: "https://github.com/acme/hello-phials",
  icons: ["mdi:hand-wave", "phoundry-mono:general-check"],
  permissions: [],
});

export default pluginManifest;
```

Use a lowercase vendor and plugin name separated by a period, such as `acme.hello-phials`. The `phials.` namespace is reserved.

`minAppVersion` is the oldest Phials version you support. `pluginApiVersion` identifies the public API contract your plugin requires. Installing a newer SDK does not by itself migrate your code to a different API major. See the [version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md).

The example command and preview do not need privileged permissions. Add permissions only when you add operations that require them.

## Update the command and provider IDs

In `src/main.ts`, replace the `example.community-demo` namespace with `acme.hello-phials` and update the names and notification:

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
  name: "Hello Phials file preview",
  canHandle: (file) => file.name.endsWith(".phials-demo-preview.txt"),
  surface: ExamplePreview,
  destinations: { pageTab: true },
};
```

Keep the existing component imports, `api` variable, activation/deactivation hooks, and default `definePlugin(pluginManifest, ...)` export. Keep these named exports too:

```ts
export { mount, unmount } from "svelte";
export { pluginManifest as manifest } from "./plugin.manifest";
```

`definePlugin` derives the definition's identity from the manifest. The build uses the exported manifest to write `dist/manifest.json`; there is no separate public manifest to maintain. Provider and command IDs use the plugin namespace so they remain unique alongside other plugins.

## Check for leftover example metadata

Search the authored files:

```bash
rg -n 'example\.community-demo|Community plugin example|phials-plugin-example' \
  package.json src
```

Update any remaining example identity or repository values. Generated `dist/` files will be replaced by the next build.

Continue to [build and run your plugin locally](./build-and-run-your-plugin-locally.md). For the complete metadata reference, see [Configure the plugin manifest](../../package-and-publish/configure-the-plugin-manifest/index.md).
