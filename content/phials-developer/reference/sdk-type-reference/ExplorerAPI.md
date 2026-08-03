---
title: "ExplorerAPI"
description: "TypeScript signature and members for the ExplorerAPI public SDK declaration."
ai_disclosure: true
order: 26
aliases:
  - references/ExplorerAPI
---

# ExplorerAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface ExplorerAPI {
    getActivePane(): PluginPaneContext | null;
    getPane(id: string): PluginPaneContext | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getActivePane` | `() => `[`PluginPaneContext`](PluginPaneContext.md)` &#124; null` | yes | - |
| `getPane` | `(id: string) => `[`PluginPaneContext`](PluginPaneContext.md)` &#124; null` | yes | - |
