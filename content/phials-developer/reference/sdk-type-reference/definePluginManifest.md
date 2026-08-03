---
title: "definePluginManifest"
description: "TypeScript signature and members for the definePluginManifest public SDK declaration."
ai_disclosure: true
order: 17
aliases:
  - references/definePluginManifest
---

# definePluginManifest

**Since Plugin API:** `1.0.0`

## Signature

```typescript
export function definePluginManifest<const T extends PluginManifest>(manifest: T): Readonly<T> {
    const result = validateManifest(manifest);
    if (!result.valid) {
        throw new Error(`Invalid plugin manifest: ${result.errors.join("; ")}`);
    }
    return Object.freeze({
        ...manifest,
        permissions: manifest.permissions ?
            Object.freeze([...manifest.permissions])
            : undefined,
        icons: manifest.icons ? Object.freeze([...manifest.icons]) : undefined,
    }) as Readonly<T>;
}
```


## Related declarations

- [`PluginManifest`](PluginManifest.md)
- [`validateManifest`](validateManifest.md)
