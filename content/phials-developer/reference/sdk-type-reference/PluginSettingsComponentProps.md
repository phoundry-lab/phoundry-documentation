---
title: "PluginSettingsComponentProps"
description: "TypeScript signature and members for the PluginSettingsComponentProps public SDK declaration."
ai_disclosure: true
order: 101
aliases:
  - references/PluginSettingsComponentProps
---

# PluginSettingsComponentProps

**Since Plugin API:** `1.0.0`

Props passed to a plugin's custom settings component in Settings → Plugins.

## Signature

```typescript
interface PluginSettingsComponentProps {
    plugin: PhialsPlugin;
    settings: PluginSettings;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plugin` | [`PhialsPlugin`](PhialsPlugin.md) | yes | - |
| `settings` | [`PluginSettings`](PluginSettings.md) | yes | The same reactive settings object supplied through `PluginAPI.settings`. |
