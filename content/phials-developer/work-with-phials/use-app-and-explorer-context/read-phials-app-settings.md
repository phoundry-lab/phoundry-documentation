---
title: "Read Phials app settings"
description: "Consumes the intentionally read-only appSettings projection and responds to supported changes without mutating global preferences."
ai_disclosure: true
order: 3
---

# Read Phials app settings

Use `api.appSettings` when a plugin presentation should follow a supported Phials preference. The projection is intentionally read-only and smaller than the complete app configuration.

```ts
interface ReadonlyAppSettings {
  readonly thumbnailsEnabled: boolean;
  readonly thumbnailSize: number;
  readonly thumbnailQuality: number;
  readonly showHiddenFiles: boolean;
  readonly showParentDirectory: boolean;
}
```

These values have app-wide meaning:

| Setting | Use |
| --- | --- |
| `thumbnailsEnabled` | Whether thumbnail presentation is enabled globally |
| `thumbnailSize` | Current thumbnail generation and display size |
| `thumbnailQuality` | Current thumbnail generation quality |
| `showHiddenFiles` | Whether dot-hidden entries may appear in Explorer listings |
| `showParentDirectory` | Whether Explorer listings include the `..` parent entry |

The Explorer pane already applies hidden-file and parent-entry settings to `pane.listing.entries`. A file view should render that listing rather than filter it again. Read the settings directly when building another presentation that genuinely needs to mirror the global choice.

## Read settings at the point of use

Retain the [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) during activation, then read its app settings in a command or provider callback:

```ts
import { getPluginAPI } from "./runtime";

function thumbnailRequestFor(file: FileEntry) {
  const settings = getPluginAPI().appSettings;

  if (!settings.thumbnailsEnabled) {
    return null;
  }

  return {
    path: file.path,
    size: settings.thumbnailSize,
    quality: settings.thumbnailQuality,
  };
}
```

Each property is a live getter. Read it when the work runs rather than copying all values during activation.

## Respond reactively in Svelte

Read app settings inside `$derived` when a mounted component should update with Phials settings:

```svelte
<script lang="ts">
  import { getPluginAPI } from "./runtime";

  const appSettings = getPluginAPI().appSettings;

  const showThumbnail = $derived(
    appSettings.thumbnailsEnabled,
  );
  const thumbnailSize = $derived(
    appSettings.thumbnailSize,
  );
</script>

{#if showThumbnail}
  <ProjectThumbnail size={thumbnailSize} />
{:else}
  <ProjectIcon />
{/if}
```

Keep the getter read inside the reactive expression. This captures only a snapshot:

```ts
const { thumbnailSize } = getPluginAPI().appSettings;
```

The local number will not change later. Destructuring is fine for one operation, but not for a long-lived reactive presentation.

Outside Svelte, read the property again when an event, command, or request runs. [ReadonlyAppSettings](../../reference/sdk-type-reference/ReadonlyAppSettings.md) does not expose a mutation method or promise to notify arbitrary long-lived services.

## Do not mutate global preferences

The following is outside the plugin contract:

```ts
// Not supported
api.appSettings.showHiddenFiles = true;
```

Do not invoke configuration commands, edit Phials configuration files, or recreate a global setting under your plugin's control. If the user needs to change a Phials preference, explain where it lives in Phials settings.

Choose the correct state owner:

| Value | Owner |
| --- | --- |
| Supported global Phials preference | `api.appSettings` |
| User-configurable plugin behavior | `api.settings` |
| Pane view, selection, navigation, or saved-view state | [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md) |
| Internal plugin application data | `api.storage` or `api.database` |

For example, “show review badges” is a plugin setting. The current Explorer item size is pane view state. Whether Phials globally enables thumbnails is an app setting.

If the global preference you want is not in [ReadonlyAppSettings](../../reference/sdk-type-reference/ReadonlyAppSettings.md), design a plugin-owned setting or file a public-SDK proposal. Do not read undocumented runtime fields.

Next, learn when and how to [call an approved host command](./call-approved-host-commands.md).
