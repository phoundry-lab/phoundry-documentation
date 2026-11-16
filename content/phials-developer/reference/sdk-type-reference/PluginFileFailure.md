---
title: "PluginFileFailure"
description: "TypeScript signature and members for the PluginFileFailure public SDK declaration."
ai_disclosure: true
order: 88
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
    readonly details?: unknown;
    readonly outcome?: "rejected" | "unknown";
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | [`PluginFileErrorCode`](PluginFileErrorCode.md) | yes | - |
| `message` | `string` | yes | - |
| `path` | `string` | no | - |
| `details` | `unknown` | no | - |
| `outcome` | `"rejected" &#124; "unknown"` | no | - |
