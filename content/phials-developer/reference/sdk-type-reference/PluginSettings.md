---
title: "PluginSettings"
description: "TypeScript signature and members for the PluginSettings public SDK declaration."
ai_disclosure: true
order: 99
aliases:
  - references/PluginSettings
---

# PluginSettings

**Since Plugin API:** `1.0.0`

Plugin settings proxy for a specific plugin

## Signature

```typescript
interface PluginSettings {
    get<T>(key: string): T | undefined;
    set(key: string, value: unknown): Promise<void>;
    getAll(): Readonly<Record<string, unknown>>;
    getStored(key: string): unknown;
    unset(key: string): Promise<void>;
    reset(): Promise<void>;
    onChange(handler: (change: PluginSettingsChange) => void): PluginSettingsSubscription;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `get` | `(key: string) => T &#124; undefined` | yes | - |
| `set` | `(key: string, value: unknown) => Promise<void>` | yes | - |
| `getAll` | `() => Readonly<Record<string, unknown>>` | yes | - |
| `getStored` | `(key: string) => unknown` | yes | Read the unvalidated durable value for migration or recovery. |
| `unset` | `(key: string) => Promise<void>` | yes | Remove one durable value and reveal the schema default. |
| `reset` | `() => Promise<void>` | yes | Remove every durable value and reveal all schema defaults. |
| `onChange` | `(handler: (change: `[`PluginSettingsChange`](PluginSettingsChange.md)`) => void) => `[`PluginSettingsSubscription`](PluginSettingsSubscription.md) | yes | - |
