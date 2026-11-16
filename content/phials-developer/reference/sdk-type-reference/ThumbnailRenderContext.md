---
title: "ThumbnailRenderContext"
description: "TypeScript signature and members for the ThumbnailRenderContext public SDK declaration."
ai_disclosure: true
order: 141
aliases:
  - references/ThumbnailRenderContext
---

# ThumbnailRenderContext

**Since Plugin API:** `2.0.0`

Captured inputs supplied automatically by Phials; providers never choose cache destinations.

## Signature

```typescript
interface ThumbnailRenderContext {
    readonly file: Readonly<FileEntry>;
    readonly host: Readonly<{
        hostId: string;
        session: number;
    }>;
    readonly plugin: Readonly<{
        id: string;
        version: string;
    }>;
    readonly provider: Readonly<{
        id: string;
        rendererVersion: string;
    }>;
    readonly generation: Readonly<{
        size: number;
        quality: number;
    }>;
    readonly settings: Readonly<Record<string, unknown>>;
    readonly variants: Readonly<Record<string, string>>;
    readonly signal: AbortSignal;
    readonly content: ThumbnailContentAccess;
    readonly native: ThumbnailNativeAccess;
    encode(canvas: HTMLCanvasElement, format?: ThumbnailRasterFormat): Promise<Blob>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | `Readonly<`[`FileEntry`](FileEntry.md)`>` | yes | - |
| `host` | `Readonly<{ … }>` | yes | - |
| `plugin` | `Readonly<{ … }>` | yes | - |
| `provider` | `Readonly<{ … }>` | yes | - |
| `generation` | `Readonly<{ … }>` | yes | - |
| `settings` | `Readonly<Record<string, unknown>>` | yes | - |
| `variants` | `Readonly<Record<string, string>>` | yes | Captured platform and, when declared, theme ID, theme.color-scheme, theme.preferred-color-scheme and theme.&lt;semantic-token&gt; colors. |
| `signal` | `AbortSignal` | yes | - |
| `content` | [`ThumbnailContentAccess`](ThumbnailContentAccess.md) | yes | - |
| `native` | [`ThumbnailNativeAccess`](ThumbnailNativeAccess.md) | yes | - |
| `encode` | `(canvas: HTMLCanvasElement, format?: `[`ThumbnailRasterFormat`](ThumbnailRasterFormat.md)`) => Promise<Blob>` | yes | Encode a static canvas using the captured generation parameters. |
