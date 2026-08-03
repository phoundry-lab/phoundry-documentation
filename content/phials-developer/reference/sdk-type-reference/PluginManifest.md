---
title: "PluginManifest"
description: "TypeScript signature and members for the PluginManifest public SDK declaration."
ai_disclosure: true
order: 87
aliases:
  - references/PluginManifest
---

# PluginManifest

**Since Plugin API:** `1.0.0`

Plugin manifest schema

## Signature

```typescript
export interface PluginManifest {
    id: string;
    name: string;
    version: string;
    minAppVersion: string;
    pluginApiVersion: string;
    author: string;
    description: string;
    authorUrl?: string;
    repository?: string;
    icons?: string[];
    permissions?: PluginPermission[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Unique plugin identifier (e.g., "vendor.plugin-name") |
| `name` | `string` | yes | Human-readable name |
| `version` | `string` | yes | Plugin version (semver format) |
| `minAppVersion` | `string` | yes | Minimum Phials app version required |
| `pluginApiVersion` | `string` | yes | Public plugin API / SDK contract version this bundle targets (semver). |
| `author` | `string` | yes | Plugin author name |
| `description` | `string` | yes | Brief description of the plugin |
| `authorUrl` | `string` | no | Author's website or profile URL |
| `repository` | `string` | no | GitHub repository URL |
| `icons` | `string[]` | no | Iconify icons to preload |
| `permissions` | [`PluginPermission`](PluginPermission.md)`[]` | no | Required permissions |
