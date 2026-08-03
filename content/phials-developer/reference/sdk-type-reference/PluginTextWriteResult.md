---
title: "PluginTextWriteResult"
description: "TypeScript signature and members for the PluginTextWriteResult public SDK declaration."
ai_disclosure: true
order: 107
aliases:
  - references/PluginTextWriteResult
---

# PluginTextWriteResult

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type PluginTextWriteResult = {
    status: "saved";
    revision: string;
} | {
    status: "conflict";
    actualRevision: string | null;
};
```
