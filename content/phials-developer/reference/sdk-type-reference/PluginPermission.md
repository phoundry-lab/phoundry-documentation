---
title: "PluginPermission"
description: "TypeScript signature and members for the PluginPermission public SDK declaration."
ai_disclosure: true
order: 97
aliases:
  - references/PluginPermission
---

# PluginPermission

**Since Plugin API:** `1.0.0`

Available permissions that plugins can request.
`shell.execute` is intentionally omitted until a native-backed, reviewed path exists.

## Signature

```typescript
export type PluginPermission = "filesystem.read" | "filesystem.write" | "clipboard.read" | "clipboard.write" | "network.fetch" | "workspace-folders.read" | "workspace-folders.write";
```

## Union members

- `filesystem.read`
- `filesystem.write`
- `clipboard.read`
- `clipboard.write`
- `network.fetch`
- `workspace-folders.read`
- `workspace-folders.write`
