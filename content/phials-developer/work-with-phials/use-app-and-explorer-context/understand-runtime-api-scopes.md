---
title: "Understand runtime API scopes"
description: "Distinguishes the base Plugin API from provider-specific extensions and identifies which lifecycle hooks and component factories receive each scope."
ai_disclosure: true
order: 1
aliases:
  - plugins/api
---

# Understand runtime API scopes

Phials creates one permission-gated [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) for an activated plugin. The plugin receives it through `onActivate`. Provider callbacks that need extra capability receive a documented specialized scope that extends the base API.

Do not construct API objects, import them from Phials source, or cast a base scope to a specialized one. The callback signature tells you what is available.

## Retain the base API during activation

Keep the API in a plugin-owned module when commands and components need it after activation:

```ts
// src/runtime.ts
let api: PluginAPI | null = null;

export function bindPluginAPI(pluginApi: PluginAPI): void {
  api = pluginApi;
}

export function unbindPluginAPI(): void {
  api = null;
}

export function getPluginAPI(): PluginAPI {
  if (!api) {
    throw new Error("The plugin is not active");
  }
  return api;
}
```

Bind and release it with the plugin lifecycle:

```ts
// src/main.ts
import {
  bindPluginAPI,
  unbindPluginAPI,
} from "./runtime";

export default function createPlugin(): PhialsPlugin {
  return {
    id: "com.example.review-tools",
    name: "Review Tools",
    version: "1.0.0",
    providers: [reviewCommands, reviewMetadata, reviewView],
    onActivate(pluginApi) {
      bindPluginAPI(pluginApi);
    },
    onDeactivate() {
      stopPluginServices();
      unbindPluginAPI();
    },
  };
}
```

Provider definitions should be safe to construct before activation. Start subscriptions, load plugin data, and perform other runtime work in `onActivate`; stop retained work in `onDeactivate`.

The base API contains:

- `settings` for user-configurable plugin behavior
- `storage` and `database` for plugin-owned data
- `appSettings` for supported read-only Phials preferences
- `files` for typed file and folder operations
- `modules` for typed center-tab opening
- `modal` and `notify` for app-native feedback
- `events` for supported host and plugin events
- `invoke` for approved host commands without a typed alternative

Each service remains scoped to the activated plugin. For example, `settings` and `storage` cannot read another plugin's values, and the database exposes only that plugin's declared tables.

## Use the callback's specialized scope

Specialized APIs extend [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), so a helper that accepts [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) can also accept them:

| Scope | Supplied to | Added capability |
| --- | --- | --- |
| [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md) | `MetadataProvider.extract` and `getFilterValueOptions` | Provider-approved binary and text reads for metadata extraction |
| [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md) | `FileBrowserViewProvider.getConfigurationItems` | View-owned scope, currently the same runtime services as [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) |
| [ModuleAPI](../../reference/sdk-type-reference/ModuleAPI.md) | `ModuleProvider.getTabBarMenuItems` | Module-owned scope, currently the same runtime services as [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) |
| [PreviewAPI](../../reference/sdk-type-reference/PreviewAPI.md) | Preview-specific factories that declare it | Metadata lookup and preview navigation operations |

Use the API argument that Phials passes on each call:

```ts
const metadataProvider: MetadataProvider = {
  type: "metadata",
  id: "com.example.review-tools.metadata",
  name: "Review metadata",
  extensions: ["review"],

  async extract(file, rawMetadata, api) {
    const text = await api.readTextFile();

    return {
      "com.example.review-tools:word-count":
        text.match(/\S+/gu)?.length ?? 0,
    };
  },
};
```

Do not replace `api.readTextFile()` with `getPluginAPI().invoke(...)`. The specialized method communicates that the read is part of the supported metadata workflow and keeps its permission and transport details behind the SDK.

[ViewAPI](../../reference/sdk-type-reference/ViewAPI.md) and [ModuleAPI](../../reference/sdk-type-reference/ModuleAPI.md) are named scopes even while they share the base member set. Use the declared type rather than erasing it; future provider-specific additions can then remain source-compatible.

## Component props and API scopes are different

Svelte provider components receive their documented props, not a global app object:

- A file view receives [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md), including its [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md).
- A module receives [ModuleProviderProps](../../reference/sdk-type-reference/ModuleProviderProps.md), including its instance and state-update functions.
- A preview surface receives [PreviewSurfaceProps](../../reference/sdk-type-reference/PreviewSurfaceProps.md), including its file, session, and destination.

When a component needs a base runtime service, read the API retained during `onActivate` from your plugin-owned runtime module. When a provider factory receives a specialized API argument, use that argument for the factory's work and do not retain a pane or file merely to recreate the callback later.

## Keep scopes inside their lifetime

- Clear the retained base API during deactivation.
- Do not start asynchronous work after deactivation begins.
- Treat callback arguments as current context, not durable global state.
- Store stable IDs when later work needs identity; do not store whole pane or file objects indefinitely.
- Let typed subscriptions and watches return their own cleanup handles, and release them during deactivation.

Next, [use the Explorer pane context](./use-explorer-pane-context.md) supplied to views, commands, context actions, and pane-aware modules.
