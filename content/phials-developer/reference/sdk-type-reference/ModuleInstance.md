---
title: "ModuleInstance"
description: "TypeScript signature and members for the ModuleInstance public SDK declaration."
ai_disclosure: true
order: 53
aliases:
  - references/ModuleInstance
---

# ModuleInstance

**Since Plugin API:** `1.0.0`

A single module instance configuration.
Multiple instances of the same module type may exist (if allowMultiple is true).

## Signature

```typescript
interface ModuleInstance {
    id: string;
    type: ModuleType;
    title?: string;
    state?: unknown;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Unique instance ID |
| `type` | `ModuleType` | yes | Module type (references ModuleProvider.id) |
| `title` | `string` | no | Custom title override (uses provider name if not set) |
| `state` | `unknown` | no | Module-specific persisted state |
