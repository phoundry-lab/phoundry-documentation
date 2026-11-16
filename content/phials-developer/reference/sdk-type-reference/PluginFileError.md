---
title: "PluginFileError"
description: "TypeScript signature and members for the PluginFileError public SDK declaration."
ai_disclosure: true
order: 81
aliases:
  - references/PluginFileError
---

# PluginFileError

**Since Plugin API:** `1.0.0`

Stable operational failure exposed by public filesystem operations.

## Signature

```typescript
declare class PluginFileError extends Error {
    readonly name: "PluginFileError";
    readonly code: PluginFileErrorCode;
    readonly path?: string;
    readonly details?: unknown;
    readonly outcome?: "rejected" | "unknown";
    constructor(code: PluginFileErrorCode, message: string, options?: {
        path?: string;
        cause?: unknown;
        details?: unknown;
        outcome?: "rejected" | "unknown";
    });
}
```


## Related declarations

- [`PluginFileErrorCode`](PluginFileErrorCode.md)
