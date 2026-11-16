---
title: "ThumbnailProvider"
description: "TypeScript signature and members for the ThumbnailProvider public SDK declaration."
ai_disclosure: true
order: 144
aliases:
  - references/ThumbnailProvider
---

# ThumbnailProvider

**Since Plugin API:** `2.0.0`

A static raster renderer selected independently from Preview and Editor providers.

## Signature

```typescript
interface ThumbnailProvider {
    type: "thumbnail";
    id: string;
    name: string;
    priority?: number;
    extensions?: string[];
    mimeTypes?: string[];
    categories?: FileCategory[];
    canHandle?: (file: FileEntry, api: FileMatchAPI) => boolean;
    rendererVersion: string;
    presentationVariants?: readonly ("platform" | "theme")[];
    requiredHostFeatures?: ThumbnailHostFeature[];
    requiredHostPlatforms?: readonly ("macos" | "windows" | "linux" | "other")[];
    render(context: ThumbnailRenderContext): Promise<ThumbnailRenderResult> | ThumbnailRenderResult;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"thumbnail"` | yes | - |
| `id` | `string` | yes | - |
| `name` | `string` | yes | - |
| `priority` | `number` | no | - |
| `extensions` | `string[]` | no | - |
| `mimeTypes` | `string[]` | no | - |
| `categories` | [`FileCategory`](FileCategory.md)`[]` | no | - |
| `canHandle` | `(file: `[`FileEntry`](FileEntry.md)`, api: `[`FileMatchAPI`](FileMatchAPI.md)`) => boolean` | no | - |
| `rendererVersion` | `string` | yes | Change when rendering behavior changes. |
| `presentationVariants` | `readonly ("platform" &#124; "theme")[]` | no | Declare Client presentation inputs that can change the encoded image. |
| `requiredHostFeatures` | [`ThumbnailHostFeature`](ThumbnailHostFeature.md)`[]` | no | Host capabilities required by this renderer. |
| `requiredHostPlatforms` | `readonly ("macos" &#124; "windows" &#124; "linux" &#124; "other")[]` | no | Executing Host platform eligibility, independent of the Client OS. |
| `render` | `(context: `[`ThumbnailRenderContext`](ThumbnailRenderContext.md)`) => Promise<`[`ThumbnailRenderResult`](ThumbnailRenderResult.md)`> &#124; `[`ThumbnailRenderResult`](ThumbnailRenderResult.md) | yes | - |
