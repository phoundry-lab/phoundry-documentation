---
title: "ContextMenuPlacementConfig"
description: "TypeScript signature and members for the ContextMenuPlacementConfig public SDK declaration."
ai_disclosure: true
order: 13
aliases:
  - references/ContextMenuPlacementConfig
---

# ContextMenuPlacementConfig

**Since Plugin API:** `1.0.0`

Context menu placement configuration.

**extends** [`CommandPlacementBase`](CommandPlacementBase.md)

## Signature

```typescript
interface ContextMenuPlacementConfig extends CommandPlacementBase {
    area: "contextMenu";
    selectionMode?: "single" | "multi" | "both";
    submenu?: {
        id: string;
        label: string;
        icon?: string;
    } | null;
    danger?: boolean;
    order?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `area` | `"contextMenu"` | yes | - |
| `selectionMode` | `"single" &#124; "multi" &#124; "both"` | no | Selection mode this applies to |
| `submenu` | `{ … } &#124; null` | no | Default submenu (null = root level) |
| `danger` | `boolean` | no | Show as dangerous (red styling) |
| `order` | `number` | no | Order within section/submenu (lower = higher in menu) |
