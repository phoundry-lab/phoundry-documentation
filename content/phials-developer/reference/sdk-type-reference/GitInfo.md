---
title: "GitInfo"
description: "TypeScript signature and members for the GitInfo public SDK declaration."
ai_disclosure: true
order: 38
aliases:
  - references/GitInfo
---

# GitInfo

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitInfo {
    readonly rootPath: string;
    readonly branch: string | null;
    readonly detached: boolean;
    readonly dirty: boolean;
    readonly ahead: number;
    readonly behind: number;
    readonly remoteUrl: string | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rootPath` | `string` | yes | - |
| `branch` | `string &#124; null` | yes | - |
| `detached` | `boolean` | yes | - |
| `dirty` | `boolean` | yes | - |
| `ahead` | `number` | yes | - |
| `behind` | `number` | yes | - |
| `remoteUrl` | `string &#124; null` | yes | - |
