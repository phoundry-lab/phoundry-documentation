---
title: "validateIdentityProjections"
description: "TypeScript signature and members for the validateIdentityProjections public SDK declaration."
ai_disclosure: true
order: 134
aliases:
  - references/validateIdentityProjections
---

# validateIdentityProjections

**Since Plugin API:** `1.0.0`

## Signature

```typescript
export function validateIdentityProjections(identity: PluginIdentity, projections: readonly PluginIdentityProjection[]): ValidationResult {
    const errors: string[] = [];
    for (const projection of projections) {
        for (const field of [
            "id",
            "version",
            "minAppVersion",
            "pluginApiVersion",
        ] as const) {
            const value = projection[field];
            if (value !== undefined && value !== identity[field]) {
                errors.push(`${projection.source}.${field} "${value}" does not match manifest "${identity[field]}"`);
            }
        }
    }
    return { valid: errors.length === 0, errors };
}
```


## Related declarations

- [`PluginIdentity`](PluginIdentity.md)
- [`PluginIdentityProjection`](PluginIdentityProjection.md)
- [`ValidationResult`](ValidationResult.md)
