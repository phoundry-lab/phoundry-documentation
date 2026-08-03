---
title: "NumberSettingsField"
description: "TypeScript signature and members for the NumberSettingsField public SDK declaration."
ai_disclosure: true
order: 60
aliases:
  - references/NumberSettingsField
---

# NumberSettingsField

**Since Plugin API:** `1.0.0`

Number settings field

**extends** [`SettingsFieldBase`](SettingsFieldBase.md)

## Signature

```typescript
interface NumberSettingsField extends SettingsFieldBase {
    type: "number";
    default: number;
    min?: number;
    max?: number;
    step?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"number"` | yes | - |
| `default` | `number` | yes | - |
| `min` | `number` | no | - |
| `max` | `number` | no | - |
| `step` | `number` | no | - |
