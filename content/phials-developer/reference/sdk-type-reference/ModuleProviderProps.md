---
title: "ModuleProviderProps"
description: "TypeScript signature and members for the ModuleProviderProps public SDK declaration."
ai_disclosure: true
order: 57
aliases:
  - references/ModuleProviderProps
---

# ModuleProviderProps

**Since Plugin API:** `1.0.0`

Props passed to module components

## Signature

```typescript
interface ModuleProviderProps {
    pane?: PluginPaneContext;
    moduleInstance: ModuleInstance;
    updateState(state: unknown): void;
    close(): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pane` | [`PluginPaneContext`](PluginPaneContext.md) | no | The pane context (for pane-scoped modules) |
| `moduleInstance` | [`ModuleInstance`](ModuleInstance.md) | yes | The module instance configuration |
| `updateState` | `(state: unknown) => void` | yes | Replace this instance's opaque state and schedule center-session persistence. |
| `close` | `() => Promise<void>` | yes | Request that the host close this module instance. |
