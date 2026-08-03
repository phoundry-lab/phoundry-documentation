---
title: "FileUtilsAPI"
description: "TypeScript signature and members for the FileUtilsAPI public SDK declaration."
ai_disclosure: true
order: 34
aliases:
  - references/FileUtilsAPI
---

# FileUtilsAPI

**Since Plugin API:** `1.0.0`

File utilities API

## Signature

```typescript
interface FileUtilsAPI {
    getExtension(filename: string): string;
    getBasename(path: string): string;
    getDirname(path: string): string;
    joinPath(...parts: string[]): string;
    pickDirectory(options?: {
        title?: string;
        initialPath?: string;
    }): Promise<string | null>;
    readDirectory(path: string): Promise<PluginDirectoryReadResult>;
    readText(path: string): Promise<PluginTextFileSnapshot>;
    writeText(path: string, content: string, options: {
        expectedRevision: string | null;
        overwrite?: boolean;
    }): Promise<PluginTextWriteResult>;
    createDirectory(path: string): Promise<void>;
    renamePath(source: string, destination: string): Promise<void>;
    trash(paths: readonly string[]): Promise<readonly PluginPathOutcome[]>;
    revealPath(path: string): Promise<void>;
    toAssetUrl(path: string): Promise<string>;
    readBinary(path: string): Promise<PluginBinaryFileSnapshot>;
    writeBinary(path: string, content: Uint8Array, options: {
        expectedRevision: string | null;
        overwrite?: boolean;
    }): Promise<PluginBinaryWriteResult>;
    getFolderSummary(path: string, options?: {
        signal?: AbortSignal;
    }): Promise<FolderSummary>;
    watchDirectory(path: string, handler: () => void): Promise<PluginDirectoryWatch>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getExtension` | `(filename: string) => string` | yes | - |
| `getBasename` | `(path: string) => string` | yes | - |
| `getDirname` | `(path: string) => string` | yes | - |
| `joinPath` | `(parts: string[]) => string` | yes | - |
| `pickDirectory` | `(options?: { … }) => Promise<string &#124; null>` | yes | - |
| `readDirectory` | `(path: string) => Promise<`[`PluginDirectoryReadResult`](PluginDirectoryReadResult.md)`>` | yes | - |
| `readText` | `(path: string) => Promise<`[`PluginTextFileSnapshot`](PluginTextFileSnapshot.md)`>` | yes | - |
| `writeText` | `(path: string, content: string, options: { … }) => Promise<`[`PluginTextWriteResult`](PluginTextWriteResult.md)`>` | yes | - |
| `createDirectory` | `(path: string) => Promise<void>` | yes | - |
| `renamePath` | `(source: string, destination: string) => Promise<void>` | yes | - |
| `trash` | `(paths: readonly string[]) => Promise<readonly `[`PluginPathOutcome`](PluginPathOutcome.md)`[]>` | yes | - |
| `revealPath` | `(path: string) => Promise<void>` | yes | - |
| `toAssetUrl` | `(path: string) => Promise<string>` | yes | - |
| `readBinary` | `(path: string) => Promise<`[`PluginBinaryFileSnapshot`](PluginBinaryFileSnapshot.md)`>` | yes | - |
| `writeBinary` | `(path: string, content: Uint8Array, options: { … }) => Promise<`[`PluginBinaryWriteResult`](PluginBinaryWriteResult.md)`>` | yes | - |
| `getFolderSummary` | `(path: string, options?: { … }) => Promise<`[`FolderSummary`](FolderSummary.md)`>` | yes | - |
| `watchDirectory` | `(path: string, handler: () => void) => Promise<`[`PluginDirectoryWatch`](PluginDirectoryWatch.md)`>` | yes | - |
