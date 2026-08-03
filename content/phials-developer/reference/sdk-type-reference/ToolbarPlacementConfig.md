---
title: "ToolbarPlacementConfig"
description: "TypeScript signature and members for the ToolbarPlacementConfig public SDK declaration."
ai_disclosure: true
order: 131
aliases:
  - references/ToolbarPlacementConfig
---

# ToolbarPlacementConfig

**Since Plugin API:** `1.0.0`

Toolbar placement configuration (PathBar toolbar).

**extends** [`CommandPlacementBase`](CommandPlacementBase.md)

## Signature

```typescript
interface ToolbarPlacementConfig extends CommandPlacementBase {
    area: "toolbar";
    icon?: string | ((ctx: CommandContext) => string);
    priority?: number;
    fixed?: boolean;
    showLabel?: boolean;
    showArrow?: boolean;
    active?: (ctx: CommandContext) => boolean;
    badgeCount?: (ctx: CommandContext) => number;
    subToolbar?: import("svelte").Component<{
        ctx: ToolbarContext;
    }>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `area` | `"toolbar"` | yes | - |
| `icon` | `string &#124; (ctx: `[`CommandContext`](CommandContext.md)`) => string` | no | Icon override for toolbar display |
| `priority` | `number` | no | Order priority (higher = more left) |
| `fixed` | `boolean` | no | If true, cannot be removed by user |
| `showLabel` | `boolean` | no | Whether to show text label by default (can be overridden by user config) |
| `showArrow` | `boolean` | no | Whether to show the dropdown chevron on commands with children (default true) |
| `active` | `(ctx: `[`CommandContext`](CommandContext.md)`) => boolean` | no | Toggle/active state indicator |
| `badgeCount` | `(ctx: `[`CommandContext`](CommandContext.md)`) => number` | no | Optional activity badge count on the path bar button |
| `subToolbar` | `import("svelte").Component<{ ctx: `[`ToolbarContext`](ToolbarContext.md)` }>` | no | Optional sub-toolbar component shown when button is toggled |
