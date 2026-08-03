---
title: "validatePluginId"
description: "TypeScript signature and members for the validatePluginId public SDK declaration."
ai_disclosure: true
order: 135
aliases:
  - references/validatePluginId
---

# validatePluginId

**Since Plugin API:** `1.0.0`

Validate a plugin ID format
Must be in format: vendor.plugin-name (lowercase, alphanumeric with hyphens)

## Signature

```typescript
export function validatePluginId(id: string): boolean {
    const pattern = /^[a-z][a-z0-9]*\.[a-z][a-z0-9-]*[a-z0-9]$/;
    return pattern.test(id) && !id.startsWith("phials.");
}
```
