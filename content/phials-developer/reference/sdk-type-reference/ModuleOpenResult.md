---
title: "ModuleOpenResult"
description: "TypeScript signature and members for the ModuleOpenResult public SDK declaration."
ai_disclosure: true
order: 54
aliases:
  - references/ModuleOpenResult
---

# ModuleOpenResult

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type ModuleOpenResult = {
    readonly status: "created";
    readonly moduleInstanceId: string;
} | {
    readonly status: "focused";
    readonly moduleInstanceId: string;
} | {
    readonly status: "replaced";
    readonly moduleInstanceId: string;
};
```
