---
title: "PERMISSION_RISK"
description: "TypeScript signature and members for the PERMISSION_RISK public SDK declaration."
ai_disclosure: true
order: 64
aliases:
  - references/PERMISSION_RISK
---

# PERMISSION_RISK

**Since Plugin API:** `1.0.0`

Risk level for each permission (for UI display)

## Signature

```typescript
export const PERMISSION_RISK: Record<PluginPermission, "low" | "medium" | "high"> = {
    "filesystem.read": "low",
    "filesystem.write": "high",
    "clipboard.read": "medium",
    "clipboard.write": "low",
    "network.fetch": "medium",
    "workspace-folders.read": "medium",
    "workspace-folders.write": "high",
};
```


## Related declarations

- [`PluginPermission`](PluginPermission.md)
