---
title: "GitFileStatus"
description: "TypeScript signature and members for the GitFileStatus public SDK declaration."
ai_disclosure: true
order: 41
aliases:
  - references/GitFileStatus
---

# GitFileStatus

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitFileStatus {
    readonly path: string;
    readonly originalPath: string | null;
    readonly indexStatus: string;
    readonly worktreeStatus: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | yes | - |
| `originalPath` | `string &#124; null` | yes | - |
| `indexStatus` | `string` | yes | Git porcelain XY codes: space means unchanged; '?' means untracked. |
| `worktreeStatus` | `string` | yes | - |
