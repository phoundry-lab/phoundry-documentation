---
title: "PreviewDestinationCapabilities"
description: "TypeScript signature and members for the PreviewDestinationCapabilities public SDK declaration."
ai_disclosure: true
order: 110
aliases:
  - references/PreviewDestinationCapabilities
---

# PreviewDestinationCapabilities

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PreviewDestinationCapabilities {
    pageTab?: boolean;
    embed?: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pageTab` | `boolean` | no | Surface may populate File mode in the universal Page tab. |
| `embed` | `boolean` | no | Surface is safe to mount inspection-only inside Markdown. |
