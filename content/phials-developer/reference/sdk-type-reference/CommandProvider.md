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
    commands: Command[] | ((api: PluginAPI) => Command[]);
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"command"` | yes | - |
| `id` | `string` | yes | Provider identifier |
| `name` | `string` | yes | Human-readable name |
| `commands` | [`Command`](Command.md)`[] &#124; (api: `[`PluginAPI`](PluginAPI.md)`) => `[`Command`](Command.md)`[]` | yes | Reactive contributions. The factory receives this plugin's scoped API. |
