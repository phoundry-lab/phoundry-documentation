---
title: "PreviewSurfaceProps"
description: "TypeScript signature and members for the PreviewSurfaceProps public SDK declaration."
ai_disclosure: true
order: 114
aliases:
  - references/PreviewSurfaceProps
---

# PreviewSurfaceProps

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PreviewSurfaceProps {
    file: FileEntry;
    api: PreviewAPI;
    session?: PreviewSession;
    destination?: PreviewDestination;
    focusEditor?: boolean;
    onConsumeFocusEditor?: () => void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | [`FileEntry`](FileEntry.md) | yes | - |
| `api` | [`PreviewAPI`](PreviewAPI.md) | yes | - |
| `session` | [`PreviewSession`](PreviewSession.md) | no | - |
| `destination` | [`PreviewDestination`](PreviewDestination.md) | no | Host destination; `embed` requires inspection-only behavior. |
| `focusEditor` | `boolean` | no | One-shot focus request; does not describe the host destination. |
| `onConsumeFocusEditor` | `() => void` | no | - |
