---
title: "PluginSettingsSchema"
description: "TypeScript signature and members for the PluginSettingsSchema public SDK declaration."
ai_disclosure: true
order: 102
aliases:
  - references/PluginSettingsSchema
---

# PluginSettingsSchema

**Since Plugin API:** `1.0.0`

Plugin settings schema

## Signature

```typescript
interface PluginSettingsSchema {
    title: string;
    fields: SettingsField[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | yes | Settings section title |
| `fields` | [`SettingsField`](SettingsField.md)`[]` | yes | Settings fields |
