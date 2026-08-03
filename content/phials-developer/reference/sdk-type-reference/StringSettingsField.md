---
title: "StringSettingsField"
description: "TypeScript signature and members for the StringSettingsField public SDK declaration."
ai_disclosure: true
order: 127
aliases:
  - references/StringSettingsField
---

# StringSettingsField

**Since Plugin API:** `1.0.0`

String settings field

**extends** [`SettingsFieldBase`](SettingsFieldBase.md)

## Signature

```typescript
interface StringSettingsField extends SettingsFieldBase {
    type: "string";
    default: string;
    placeholder?: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"string"` | yes | - |
| `default` | `string` | yes | - |
| `placeholder` | `string` | no | - |
