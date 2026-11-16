---
title: "GitDiffOptions"
description: "TypeScript signature and members for the GitDiffOptions public SDK declaration."
ai_disclosure: true
order: 40
aliases:
  - references/GitDiffOptions
---

# GitDiffOptions

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitDiffOptions {
    readonly staged?: boolean;
    readonly file?: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `staged` | `boolean` | no | - |
| `file` | `string` | no | Literal repository-relative path using forward slashes; omitted for all tracked files. |
