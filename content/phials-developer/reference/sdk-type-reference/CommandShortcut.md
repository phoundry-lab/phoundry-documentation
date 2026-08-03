---
title: "CommandShortcut"
description: "TypeScript signature and members for the CommandShortcut public SDK declaration."
ai_disclosure: true
order: 11
aliases:
  - references/CommandShortcut
---

# CommandShortcut

**Since Plugin API:** `1.0.0`

Keyboard shortcut configuration for a command.

## Signature

```typescript
interface CommandShortcut {
    defaults?: ShortcutDefinition[];
    allowDefault?: boolean;
    priority?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `defaults` | [`ShortcutDefinition`](ShortcutDefinition.md)`[]` | no | Default shortcut(s) - up to 3 |
| `allowDefault` | `boolean` | no | If true, don't call preventDefault() after handling |
| `priority` | `number` | no | Priority for conflict resolution (higher = checked first) |
