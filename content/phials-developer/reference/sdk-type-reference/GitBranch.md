---
title: "GitBranch"
description: "TypeScript signature and members for the GitBranch public SDK declaration."
ai_disclosure: true
order: 38
aliases:
  - references/GitBranch
---

# GitBranch

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitBranch {
    readonly name: string;
    readonly oid: string;
    readonly current: boolean;
    readonly upstream: string | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | - |
| `oid` | `string` | yes | - |
| `current` | `boolean` | yes | - |
| `upstream` | `string &#124; null` | yes | - |
