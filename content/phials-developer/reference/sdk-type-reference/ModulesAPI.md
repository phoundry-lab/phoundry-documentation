---
title: "ModulesAPI"
description: "TypeScript signature and members for the ModulesAPI public SDK declaration."
ai_disclosure: true
order: 58
aliases:
  - references/ModulesAPI
---

# ModulesAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface ModulesAPI {
    openCenter(moduleProviderId: string, state: unknown, options?: {
        sourcePaneId?: string;
    }): Promise<ModuleOpenResult>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `openCenter` | `(moduleProviderId: string, state: unknown, options?: { … }) => Promise<`[`ModuleOpenResult`](ModuleOpenResult.md)`>` | yes | - |
