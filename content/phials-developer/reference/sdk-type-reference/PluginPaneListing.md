---
title: "PluginPaneListing"
description: "TypeScript signature and members for the PluginPaneListing public SDK declaration."
ai_disclosure: true
order: 90
aliases:
  - references/PluginPaneListing
---

# PluginPaneListing

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginPaneListing {
    readonly loading: boolean;
    readonly entries: readonly FileEntry[];
    readonly failures: readonly PluginFileFailure[];
    refresh(): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `loading` | `boolean` | yes | - |
| `entries` | `readonly `[`FileEntry`](FileEntry.md)`[]` | yes | - |
| `failures` | `readonly `[`PluginFileFailure`](PluginFileFailure.md)`[]` | yes | - |
| `refresh` | `() => Promise<void>` | yes | - |
