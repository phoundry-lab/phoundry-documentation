---
title: "ThumbnailNativeAccess"
description: "TypeScript signature and members for the ThumbnailNativeAccess public SDK declaration."
ai_disclosure: true
order: 142
aliases:
  - references/ThumbnailNativeAccess
---

# ThumbnailNativeAccess

**Since Plugin API:** `2.0.0`

## Signature

```typescript
interface ThumbnailNativeAccess {
    appIcon(): Promise<ThumbnailNativeResult | {
        status: "no-image";
    }>;
    dmg(): Promise<ThumbnailNativeResult | {
        status: "no-image";
    }>;
    steam(): Promise<ThumbnailNativeResult | {
        status: "no-image";
    }>;
    folder(): Promise<ThumbnailNativeResult | {
        status: "no-image";
    }>;
    image(): Promise<ThumbnailNativeResult>;
    video(): Promise<ThumbnailNativeResult>;
    audioArtwork(): Promise<ThumbnailNativeResult | {
        status: "no-image";
    }>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appIcon` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)` &#124; { … }>` | yes | Existing built-in native icon authority on the owning Host. |
| `dmg` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)` &#124; { … }>` | yes | - |
| `steam` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)` &#124; { … }>` | yes | - |
| `folder` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)` &#124; { … }>` | yes | - |
| `image` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)`>` | yes | - |
| `video` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)`>` | yes | - |
| `audioArtwork` | `() => Promise<`[`ThumbnailNativeResult`](ThumbnailNativeResult.md)` &#124; { … }>` | yes | - |
