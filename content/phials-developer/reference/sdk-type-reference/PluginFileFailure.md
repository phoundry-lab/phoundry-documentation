---
title: "PluginFileFailure"
description: "TypeScript signature and members for the PluginFileFailure public SDK declaration."
ai_disclosure: true
order: 83
aliases:
  - references/PluginFileFailure
---

# PluginFileFailure

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginFileFailure {
    readonly code: PluginFileErrorCode;
    readonly message: string;
    readonly path?: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | [`PluginFileErrorCode`](PluginFileErrorCode.md) | yes | - |
| `message` | `string` | yes | - |
| `path` | `string` | no | - |
