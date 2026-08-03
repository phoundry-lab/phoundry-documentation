---
title: "ItemShortcutConfig"
description: "TypeScript signature and members for the ItemShortcutConfig public SDK declaration."
ai_disclosure: true
order: 39
aliases:
  - references/ItemShortcutConfig
---

# ItemShortcutConfig

**Since Plugin API:** `1.0.0`

Shortcut configuration for module providers and other item-level shortcuts.
When defined on a module, the shortcut is auto-registered with ShortcutManager.

## Signature

```typescript
interface ItemShortcutConfig {
    defaults?: ShortcutDefinition[];
    description?: string;
    allowDefault?: boolean;
    priority?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `defaults` | [`ShortcutDefinition`](ShortcutDefinition.md)`[]` | no | Default shortcuts (up to 3). Use ShortcutDefinition format. |
| `description` | `string` | no | Description shown in shortcuts settings |
| `allowDefault` | `boolean` | no | If true, don't call preventDefault() after handling |
| `priority` | `number` | no | Priority for conflict resolution (higher = checked first) |
