---
title: "SelectSettingsField"
description: "TypeScript signature and members for the SelectSettingsField public SDK declaration."
ai_disclosure: true
order: 122
aliases:
  - references/SelectSettingsField
---

# SelectSettingsField

**Since Plugin API:** `1.0.0`

Select settings field

**extends** [`SettingsFieldBase`](SettingsFieldBase.md)

## Signature

```typescript
interface SelectSettingsField extends SettingsFieldBase {
    type: "select";
    options: {
        value: string;
        label: string;
    }[];
    default: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"select"` | yes | - |
| `options` | `{ … }[]` | yes | - |
| `default` | `string` | yes | - |
