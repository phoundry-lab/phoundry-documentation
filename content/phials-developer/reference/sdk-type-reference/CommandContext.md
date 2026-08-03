---
title: "CommandContext"
description: "TypeScript signature and members for the CommandContext public SDK declaration."
ai_disclosure: true
order: 5
aliases:
  - references/CommandContext
---

# CommandContext

**Since Plugin API:** `1.0.0`

Runtime context passed to command handlers and predicates.
Built from the active pane's current state.

## Signature

```typescript
interface CommandContext {
    pane: PluginPaneContext;
    selectedFiles: FileEntry[];
    targetFile: FileEntry | null;
    currentPath: string;
    isVial: boolean;
    hasPropertySchema: boolean;
    activeContextKeys: ReadonlySet<CommandContextKey>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pane` | [`PluginPaneContext`](PluginPaneContext.md) | yes | The active pane (always available) |
| `selectedFiles` | [`FileEntry`](FileEntry.md)`[]` | yes | Selected files (empty if none) |
| `targetFile` | [`FileEntry`](FileEntry.md)` &#124; null` | yes | The "target" file (for context menu: right-clicked file; otherwise: first selected) |
| `currentPath` | `string` | yes | Current directory path |
| `isVial` | `boolean` | yes | Whether current directory is a vial |
| `hasPropertySchema` | `boolean` | yes | Whether the saved-views scope has a property schema (e.g. Boards). |
| `activeContextKeys` | `ReadonlySet<`[`CommandContextKey`](CommandContextKey.md)`>` | yes | Active context keys (for debugging/inspection) |
