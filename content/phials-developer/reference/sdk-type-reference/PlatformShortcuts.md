---
title: "PlatformShortcuts"
description: "TypeScript signature and members for the PlatformShortcuts public SDK declaration."
ai_disclosure: true
order: 66
aliases:
  - references/PlatformShortcuts
---

# PlatformShortcuts

**Since Plugin API:** `1.0.0`

Platform-specific shortcut definitions.
Use when different platforms need different shortcuts.

## Signature

```typescript
interface PlatformShortcuts {
    mac?: string;
    windows?: string;
    linux?: string;
    default?: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mac` | `string` | no | - |
| `windows` | `string` | no | - |
| `linux` | `string` | no | - |
| `default` | `string` | no | Fallback for unspecified platforms |
