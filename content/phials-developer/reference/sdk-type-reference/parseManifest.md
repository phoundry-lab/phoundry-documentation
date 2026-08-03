---
title: "parseManifest"
description: "TypeScript signature and members for the parseManifest public SDK declaration."
ai_disclosure: true
order: 61
aliases:
  - references/parseManifest
---

# parseManifest

**Since Plugin API:** `1.0.0`

Parse and validate a manifest JSON string

## Signature

```typescript
export function parseManifest(json: string): {
    manifest: PluginManifest | null;
    errors: string[];
} {
    let parsed: unknown;
    try {
        parsed = JSON.parse(json);
    }
    catch {
        return { manifest: null, errors: ["Invalid JSON"] };
    }
    const result = validateManifest(parsed);
    if (!result.valid) {
        return { manifest: null, errors: result.errors };
    }
    return { manifest: parsed as PluginManifest, errors: [] };
}
```


## Related declarations

- [`PluginManifest`](PluginManifest.md)
- [`validateManifest`](validateManifest.md)
