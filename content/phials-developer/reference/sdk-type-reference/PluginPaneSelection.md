---
title: "PluginPaneSelection"
description: "TypeScript signature and members for the PluginPaneSelection public SDK declaration."
ai_disclosure: true
order: 92
aliases:
  - references/PluginPaneSelection
---

# PluginPaneSelection

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginPaneSelection {
    readonly entries: readonly FileEntry[];
    readonly paths: readonly string[];
    set(paths: readonly string[]): void;
    selectAll(): void;
    clear(): void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entries` | `readonly `[`FileEntry`](FileEntry.md)`[]` | yes | - |
| `paths` | `readonly string[]` | yes | - |
| `set` | `(paths: readonly string[]) => void` | yes | - |
| `selectAll` | `() => void` | yes | - |
| `clear` | `() => void` | yes | - |
