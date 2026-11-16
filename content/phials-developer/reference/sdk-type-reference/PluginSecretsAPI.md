---
title: "PluginSecretsAPI"
description: "TypeScript signature and members for the PluginSecretsAPI public SDK declaration."
ai_disclosure: true
order: 100
aliases:
  - references/PluginSecretsAPI
---

# PluginSecretsAPI

**Since Plugin API:** `1.1.0`

Encrypted, Plugin-scoped string storage. The OS credential service unlocks its vault.

## Signature

```typescript
interface PluginSecretsAPI {
    status(): Promise<"ready" | "locked">;
    has(key: string): Promise<boolean>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | `() => Promise<"ready" &#124; "locked">` | yes | - |
| `has` | `(key: string) => Promise<boolean>` | yes | - |
| `get` | `(key: string) => Promise<string &#124; null>` | yes | - |
| `set` | `(key: string, value: string) => Promise<void>` | yes | - |
| `delete` | `(key: string) => Promise<void>` | yes | - |
