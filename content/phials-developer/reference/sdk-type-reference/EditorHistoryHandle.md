---
title: "EditorHistoryHandle"
description: "TypeScript signature and members for the EditorHistoryHandle public SDK declaration."
ai_disclosure: true
order: 20
aliases:
  - references/EditorHistoryHandle
---

# EditorHistoryHandle

**Since Plugin API:** `1.0.0`

In-session undo/redo surface for preview editor toolbars and code/markdown editors.

## Signature

```typescript
interface EditorHistoryHandle {
    undo: () => boolean;
    redo: () => boolean;
    canUndo: boolean;
    canRedo: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `undo` | `() => boolean` | yes | - |
| `redo` | `() => boolean` | yes | - |
| `canUndo` | `boolean` | yes | - |
| `canRedo` | `boolean` | yes | - |
