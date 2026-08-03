---
title: "definePlugin"
description: "TypeScript signature and members for the definePlugin public SDK declaration."
ai_disclosure: true
order: 16
aliases:
  - references/definePlugin
---

# definePlugin

**Since Plugin API:** `1.0.0`

## Signature

```typescript
export function definePlugin(manifest: PluginManifest, definition: Omit<PhialsPlugin, "id" | "name" | "version">): PhialsPlugin {
    const validManifest = definePluginManifest(manifest);
    return Object.freeze({
        ...definition,
        id: validManifest.id,
        name: validManifest.name,
        version: validManifest.version,
    });
}
```


## Related declarations

- [`PluginManifest`](PluginManifest.md)
- [`PhialsPlugin`](PhialsPlugin.md)
- [`definePluginManifest`](definePluginManifest.md)
