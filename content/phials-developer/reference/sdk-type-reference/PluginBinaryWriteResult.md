---
title: "PluginBinaryWriteResult"
description: "TypeScript signature and members for the PluginBinaryWriteResult public SDK declaration."
ai_disclosure: true
order: 69
aliases:
  - references/PluginBinaryWriteResult
---

# PluginBinaryWriteResult

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type PluginBinaryWriteResult = {
    readonly status: "saved";
    readonly revision: string;
} | {
    readonly status: "conflict";
    readonly actualRevision: string | null;
};
```
