---
title: "WorkspaceFolderCalendarValue"
description: "TypeScript signature and members for the WorkspaceFolderCalendarValue public SDK declaration."
ai_disclosure: true
order: 142
aliases:
  - references/WorkspaceFolderCalendarValue
---

# WorkspaceFolderCalendarValue

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type WorkspaceFolderCalendarValue = {
    readonly kind: "date";
    readonly start: string;
    readonly end?: string;
} | {
    readonly kind: "datetime";
    readonly start: string;
    readonly end?: string;
};
```
