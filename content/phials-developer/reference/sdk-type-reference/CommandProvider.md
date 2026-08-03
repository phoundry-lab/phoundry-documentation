---
title: "CommandProvider"
description: "TypeScript signature and members for the CommandProvider public SDK declaration."
ai_disclosure: true
order: 10
aliases:
  - references/CommandProvider
---

# CommandProvider

**Since Plugin API:** `1.0.0`

A command provider contributes commands from a plugin.

## Signature

```typescript
interface CommandProvider {
    type: "command";
    id: string;
    name: string;
    commands: Command[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"command"` | yes | - |
| `id` | `string` | yes | Provider identifier |
| `name` | `string` | yes | Human-readable name |
| `commands` | [`Command`](Command.md)`[]` | yes | Commands contributed by this provider |
