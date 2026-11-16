---
title: "ThumbnailContentAccess"
description: "TypeScript signature and members for the ThumbnailContentAccess public SDK declaration."
ai_disclosure: true
order: 136
aliases:
  - references/ThumbnailContentAccess
---

# ThumbnailContentAccess

**Since Plugin API:** `2.0.0`

## Signature

```typescript
interface ThumbnailContentAccess {
    openSnapshot(path?: string): Promise<ThumbnailContentSnapshot>;
    readTextPrefix(path?: string, limit?: number): Promise<string>;
    readBinaryPrefix(path?: string, limit?: number): Promise<Uint8Array>;
    readText(path?: string): Promise<PluginTextFileSnapshot>;
    readBinary(path?: string): Promise<PluginBinaryFileSnapshot>;
    readDirectory(path?: string): Promise<PluginDirectoryReadResult>;
    selectDirectory(path: string, selection: ThumbnailDirectorySelection): Promise<string | null>;
    declareInput(input: ThumbnailInputDeclaration): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `openSnapshot` | `(path?: string) => Promise<`[`ThumbnailContentSnapshot`](ThumbnailContentSnapshot.md)`>` | yes | Grant a revision-pinned source without loading the complete File. |
| `readTextPrefix` | `(path?: string, limit?: number) => Promise<string>` | yes | Bounded UTF-8 display prefix, tracked against the captured source revision. |
| `readBinaryPrefix` | `(path?: string, limit?: number) => Promise<Uint8Array>` | yes | Raw source-bound prefix; at most256KiB, without whole-File snapshot assembly. |
| `readText` | `(path?: string) => Promise<`[`PluginTextFileSnapshot`](PluginTextFileSnapshot.md)`>` | yes | - |
| `readBinary` | `(path?: string) => Promise<`[`PluginBinaryFileSnapshot`](PluginBinaryFileSnapshot.md)`>` | yes | - |
| `readDirectory` | `(path?: string) => Promise<`[`PluginDirectoryReadResult`](PluginDirectoryReadResult.md)`>` | yes | - |
| `selectDirectory` | `(path: string, selection: `[`ThumbnailDirectorySelection`](ThumbnailDirectorySelection.md)`) => Promise<string &#124; null>` | yes | Host reruns this bounded, deterministic selection, including successful absence. |
| `declareInput` | `(input: `[`ThumbnailInputDeclaration`](ThumbnailInputDeclaration.md)`) => Promise<void>` | yes | Additional ambient inputs must be declared in a form the Host can validate. |
