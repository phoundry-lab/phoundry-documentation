---
title: "ThumbnailRenderResult"
description: "TypeScript signature and members for the ThumbnailRenderResult public SDK declaration."
ai_disclosure: true
order: 147
aliases:
  - references/ThumbnailRenderResult
---

# ThumbnailRenderResult

**Since Plugin API:** `2.0.0`

## Signature

```typescript
type ThumbnailRenderResult = Blob | {
    status: "html";
    html: string;
} | {
    status: "no-image";
} | ThumbnailNativeResult;
```

## Related declarations

- [`ThumbnailNativeResult`](ThumbnailNativeResult.md)
