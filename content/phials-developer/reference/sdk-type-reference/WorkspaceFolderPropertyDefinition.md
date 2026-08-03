---
title: "WorkspaceFolderPropertyDefinition"
description: "TypeScript signature and members for the WorkspaceFolderPropertyDefinition public SDK declaration."
ai_disclosure: true
order: 142
aliases:
  - references/WorkspaceFolderPropertyDefinition
---

# WorkspaceFolderPropertyDefinition

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface WorkspaceFolderPropertyDefinition {
    readonly id: string;
    readonly name: string;
    readonly displayName: string;
    readonly type: WorkspaceFolderPropertyType;
    readonly options?: readonly WorkspaceFolderPropertyOption[];
    readonly derived: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | - |
| `name` | `string` | yes | - |
| `displayName` | `string` | yes | - |
| `type` | [`WorkspaceFolderPropertyType`](WorkspaceFolderPropertyType.md) | yes | - |
| `options` | `readonly `[`WorkspaceFolderPropertyOption`](WorkspaceFolderPropertyOption.md)`[]` | no | - |
| `derived` | `boolean` | yes | - |
