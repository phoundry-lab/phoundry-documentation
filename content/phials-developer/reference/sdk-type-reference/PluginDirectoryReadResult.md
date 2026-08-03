---
title: "PluginDirectoryReadResult"
description: "TypeScript signature and members for the PluginDirectoryReadResult public SDK declaration."
ai_disclosure: true
order: 78
aliases:
  - references/PluginDirectoryReadResult
---

# PluginDirectoryReadResult

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginDirectoryReadResult {
    readonly entries: readonly FileEntry[];
    readonly failures: readonly PluginFileFailure[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entries` | `readonly `[`FileEntry`](FileEntry.md)`[]` | yes | - |
| `failures` | `readonly `[`PluginFileFailure`](PluginFileFailure.md)`[]` | yes | - |
