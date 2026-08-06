---
title: "validateSemver"
description: "TypeScript signature and members for the validateSemver public SDK declaration."
ai_disclosure: true
order: 137
aliases:
  - references/validateSemver
---

# validateSemver

**Since Plugin API:** `1.0.0`

Validate complete SemVer 2.0.0 syntax.

## Signature

```typescript
export function validateSemver(version: string): boolean {
    return SEMVER_PATTERN.test(version);
}
```
