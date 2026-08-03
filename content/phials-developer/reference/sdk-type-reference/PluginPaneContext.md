---
title: "PluginPaneContext"
description: "TypeScript signature and members for the PluginPaneContext public SDK declaration."
ai_disclosure: true
order: 89
aliases:
  - references/PluginPaneContext
---

# PluginPaneContext

**Since Plugin API:** `1.0.0`

Stable reactive projection of one Explorer pane.

The host owns the backing pane and keeps these readonly projections current.
Acquire a pane explicitly through `api.explorer` and do not retain it after
the owning plugin API is invalidated.

## Signature

```typescript
interface PluginPaneContext {
    readonly id: string;
    readonly listing: PluginPaneListing;
    readonly selection: PluginPaneSelection;
    readonly navigation: PluginPaneNavigation;
    readonly view: PluginPaneView;
    readonly workspaceFolder: PluginPaneWorkspaceFolder | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | - |
| `listing` | [`PluginPaneListing`](PluginPaneListing.md) | yes | - |
| `selection` | [`PluginPaneSelection`](PluginPaneSelection.md) | yes | - |
| `navigation` | [`PluginPaneNavigation`](PluginPaneNavigation.md) | yes | - |
| `view` | [`PluginPaneView`](PluginPaneView.md) | yes | - |
| `workspaceFolder` | [`PluginPaneWorkspaceFolder`](PluginPaneWorkspaceFolder.md)` &#124; null` | yes | - |
