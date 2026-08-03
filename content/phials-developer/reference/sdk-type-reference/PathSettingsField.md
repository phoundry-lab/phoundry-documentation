---
title: "PathSettingsField"
description: "TypeScript signature and members for the PathSettingsField public SDK declaration."
ai_disclosure: true
order: 62
aliases:
  - references/PathSettingsField
---

# PathSettingsField

**Since Plugin API:** `1.0.0`

Path settings field

**extends** [`SettingsFieldBase`](SettingsFieldBase.md)

## Signature

```typescript
interface PathSettingsField extends SettingsFieldBase {
    type: "path";
    default: string;
    directory?: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"path"` | yes | - |
| `default` | `string` | yes | - |
| `directory` | `boolean` | no | - |
