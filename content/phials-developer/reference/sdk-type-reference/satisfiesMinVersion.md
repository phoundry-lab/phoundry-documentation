---
title: "satisfiesMinVersion"
description: "TypeScript signature and members for the satisfiesMinVersion public SDK declaration."
ai_disclosure: true
order: 121
aliases:
  - references/satisfiesMinVersion
---

# satisfiesMinVersion

**Since Plugin API:** `1.0.0`

Check if a version satisfies a minimum version requirement

## Signature

```typescript
export function satisfiesMinVersion(version: string, minVersion: string): boolean {
    return compareSemver(version, minVersion) >= 0;
}
```


## Related declarations

- [`compareSemver`](compareSemver.md)
