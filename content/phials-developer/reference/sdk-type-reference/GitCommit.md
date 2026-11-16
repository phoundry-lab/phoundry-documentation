---
title: "GitCommit"
description: "TypeScript signature and members for the GitCommit public SDK declaration."
ai_disclosure: true
order: 39
aliases:
  - references/GitCommit
---

# GitCommit

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitCommit {
    readonly oid: string;
    readonly parents: readonly string[];
    readonly authorName: string;
    readonly authorEmail: string;
    readonly authoredAt: string;
    readonly subject: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `oid` | `string` | yes | - |
| `parents` | `readonly string[]` | yes | - |
| `authorName` | `string` | yes | - |
| `authorEmail` | `string` | yes | - |
| `authoredAt` | `string` | yes | - |
| `subject` | `string` | yes | - |
