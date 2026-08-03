---
title: "PluginStorageAPI"
description: "TypeScript signature and members for the PluginStorageAPI public SDK declaration."
ai_disclosure: true
order: 104
aliases:
  - references/PluginStorageAPI
---

# PluginStorageAPI

**Since Plugin API:** `1.0.0`

Key/value storage API for plugin data (separate from settings)

## Signature

```typescript
interface PluginStorageAPI {
    get<T>(key: string): Promise<T | null>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
    keys(): Promise<string[]>;
    clear(): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `get` | `(key: string) => Promise<T &#124; null>` | yes | Get a value by key |
| `set` | `(key: string, value: unknown) => Promise<void>` | yes | Set a value by key |
| `delete` | `(key: string) => Promise<void>` | yes | Delete a value by key |
| `keys` | `() => Promise<string[]>` | yes | Get all keys for this plugin |
| `clear` | `() => Promise<void>` | yes | Clear all data for this plugin |
