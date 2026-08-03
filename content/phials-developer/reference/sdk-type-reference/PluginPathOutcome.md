---
title: "PluginPathOutcome"
description: "TypeScript signature and members for the PluginPathOutcome public SDK declaration."
ai_disclosure: true
order: 96
aliases:
  - references/PluginPathOutcome
---

# PluginPathOutcome

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type PluginPathOutcome = {
    readonly path: string;
    readonly status: "succeeded";
} | {
    readonly path: string;
    readonly status: "failed";
    readonly failure: PluginFileFailure;
};
```

## Related declarations

- [`PluginFileFailure`](PluginFileFailure.md)
