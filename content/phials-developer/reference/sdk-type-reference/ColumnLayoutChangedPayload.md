---
title: "ColumnLayoutChangedPayload"
description: "TypeScript signature and members for the ColumnLayoutChangedPayload public SDK declaration."
ai_disclosure: true
order: 3
aliases:
  - references/ColumnLayoutChangedPayload
---

# ColumnLayoutChangedPayload

**Since Plugin API:** `1.0.0`

Details column layout live-sync payload (ADR-0010).

## Signature

```typescript
interface ColumnLayoutChangedPayload {
    browsedPath: string;
    savedViewsCount: number;
    activeSavedViewId: string | null;
    columnConfig: DetailsViewColumnConfig[];
    calculationRowVisible: boolean;
    sourcePaneId: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `browsedPath` | `string` | yes | - |
| `savedViewsCount` | `number` | yes | - |
| `activeSavedViewId` | `string &#124; null` | yes | - |
| `columnConfig` | `DetailsViewColumnConfig[]` | yes | - |
| `calculationRowVisible` | `boolean` | yes | - |
| `sourcePaneId` | `string` | yes | - |
