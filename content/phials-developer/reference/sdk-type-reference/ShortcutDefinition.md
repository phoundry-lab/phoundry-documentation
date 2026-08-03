---
title: "ShortcutDefinition"
description: "TypeScript signature and members for the ShortcutDefinition public SDK declaration."
ai_disclosure: true
order: 126
aliases:
  - references/ShortcutDefinition
---

# ShortcutDefinition

**Since Plugin API:** `1.0.0`

Shortcut definition syntax:
- "CmdOrCtrl+S" - Platform-dependent (Cmd on Mac, Ctrl on Win/Linux)
- "Ctrl+Shift+N" - Explicit modifiers
- "Delete" - Single key
- `{ mac: "Cmd+Backspace", default: "Delete" }` - Platform-specific

## Signature

```typescript
type ShortcutDefinition = string | PlatformShortcuts;
```

## Related declarations

- [`PlatformShortcuts`](PlatformShortcuts.md)
