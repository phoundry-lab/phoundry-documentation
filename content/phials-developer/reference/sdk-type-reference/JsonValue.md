---
title: "JsonValue"
description: "TypeScript signature and members for the JsonValue public SDK declaration."
ai_disclosure: true
order: 40
aliases:
  - references/JsonValue
---

# JsonValue

**Since Plugin API:** `1.0.0`

## Signature

```typescript
type JsonValue = JsonPrimitive | readonly JsonValue[] | {
    readonly [key: string]: JsonValue;
};
```
