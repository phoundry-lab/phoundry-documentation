---
title: "PERMISSION_DESCRIPTIONS"
description: "TypeScript signature and members for the PERMISSION_DESCRIPTIONS public SDK declaration."
ai_disclosure: true
order: 63
aliases:
  - references/PERMISSION_DESCRIPTIONS
---

# PERMISSION_DESCRIPTIONS

**Since Plugin API:** `1.0.0`

Human-readable descriptions for each permission

## Signature

```typescript
export const PERMISSION_DESCRIPTIONS: Record<PluginPermission, string> = {
    "filesystem.read": "Read files from your filesystem",
    "filesystem.write": "Write and delete files on your filesystem",
    "clipboard.read": "Read content from your clipboard",
    "clipboard.write": "Write content to your clipboard",
    "network.fetch": "Make network requests to external servers",
    "workspace-folders.read": "Read Workspace Folder schemas and values",
    "workspace-folders.write": "Change Workspace Folder schemas and values",
};
```


## Related declarations

- [`PluginPermission`](PluginPermission.md)
