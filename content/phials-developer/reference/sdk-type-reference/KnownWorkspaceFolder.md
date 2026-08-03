---
title: "KnownWorkspaceFolder"
description: "TypeScript signature and members for the KnownWorkspaceFolder public SDK declaration."
ai_disclosure: true
order: 41
aliases:
  - references/KnownWorkspaceFolder
---

# KnownWorkspaceFolder

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface KnownWorkspaceFolder {
    readonly id: string;
    readonly rootPath: string;
    readonly name: string;
    readonly icon?: string;
    readonly available: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | - |
| `rootPath` | `string` | yes | - |
| `name` | `string` | yes | - |
| `icon` | `string` | no | - |
| `available` | `boolean` | yes | - |
