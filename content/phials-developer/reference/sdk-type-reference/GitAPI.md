---
title: "GitAPI"
description: "TypeScript signature and members for the GitAPI public SDK declaration."
ai_disclosure: true
order: 37
aliases:
  - references/GitAPI
---

# GitAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitAPI {
    getInfo(path: string): Promise<GitInfo | null>;
    getLanguages(path: string): Promise<readonly RepositoryLanguage[]>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getInfo` | `(path: string) => Promise<`[`GitInfo`](GitInfo.md)` &#124; null>` | yes | - |
| `getLanguages` | `(path: string) => Promise<readonly `[`RepositoryLanguage`](RepositoryLanguage.md)`[]>` | yes | - |
