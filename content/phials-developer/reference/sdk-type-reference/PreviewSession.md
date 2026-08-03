---
title: "PreviewSession"
description: "TypeScript signature and members for the PreviewSession public SDK declaration."
ai_disclosure: true
order: 112
aliases:
  - references/PreviewSession
---

# PreviewSession

**Since Plugin API:** `1.0.0`

Provider-owned state shared by every presentation of one file preview.

## Signature

```typescript
interface PreviewSession {
    retainOnRelease?: () => boolean;
    dispose?: () => void | Promise<void>;
    relocate?: (oldPath: string, newPath: string) => void | Promise<void>;
    editor?: PreviewToolbarEditorState;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retainOnRelease` | `() => boolean` | no | Clean unreferenced sessions are disposed; unresolved work can retain itself. |
| `dispose` | `() => void &#124; Promise<void>` | no | - |
| `relocate` | `(oldPath: string, newPath: string) => void &#124; Promise<void>` | no | Optional in-app path relocation hook. |
| `editor` | [`PreviewToolbarEditorState`](PreviewToolbarEditorState.md) | no | Standard editor state rendered by host preview toolbars. |
