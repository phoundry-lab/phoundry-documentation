---
title: "manifestIdentity"
description: "TypeScript signature and members for the manifestIdentity public SDK declaration."
ai_disclosure: true
order: 44
aliases:
  - references/manifestIdentity
---

# manifestIdentity

**Since Plugin API:** `1.0.0`

## Signature

```typescript
export function manifestIdentity(manifest: PluginManifest): PluginIdentity {
    return {
        id: manifest.id,
        version: manifest.version,
        minAppVersion: manifest.minAppVersion,
        pluginApiVersion: manifest.pluginApiVersion,
    };
}
```


## Related declarations

- [`PluginManifest`](PluginManifest.md)
- [`PluginIdentity`](PluginIdentity.md)
