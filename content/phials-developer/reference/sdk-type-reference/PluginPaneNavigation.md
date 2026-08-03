---
title: "PluginPaneNavigation"
description: "TypeScript signature and members for the PluginPaneNavigation public SDK declaration."
ai_disclosure: true
order: 91
aliases:
  - references/PluginPaneNavigation
---

# PluginPaneNavigation

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginPaneNavigation {
    readonly currentPath: string | null;
    readonly canGoBack: boolean;
    readonly canGoForward: boolean;
    readonly canGoUp: boolean;
    navigateTo(path: string): Promise<void>;
    openPath(path: string): Promise<void>;
    back(): Promise<void>;
    forward(): Promise<void>;
    up(): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currentPath` | `string &#124; null` | yes | - |
| `canGoBack` | `boolean` | yes | - |
| `canGoForward` | `boolean` | yes | - |
| `canGoUp` | `boolean` | yes | - |
| `navigateTo` | `(path: string) => Promise<void>` | yes | - |
| `openPath` | `(path: string) => Promise<void>` | yes | - |
| `back` | `() => Promise<void>` | yes | - |
| `forward` | `() => Promise<void>` | yes | - |
| `up` | `() => Promise<void>` | yes | - |
