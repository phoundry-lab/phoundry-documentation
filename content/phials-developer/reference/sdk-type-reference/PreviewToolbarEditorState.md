---
title: "PreviewToolbarEditorState"
description: "TypeScript signature and members for the PreviewToolbarEditorState public SDK declaration."
ai_disclosure: true
order: 116
aliases:
  - references/PreviewToolbarEditorState
---

# PreviewToolbarEditorState

**Since Plugin API:** `1.0.0`

Editor state exposed by a file viewing and editing capability.

## Signature

```typescript
interface PreviewToolbarEditorState {
    isDirty: boolean;
    autosave?: boolean;
    saving?: boolean;
    onSave: () => void | Promise<void>;
    onFinalize?: () => Promise<boolean>;
    onRevert?: () => void;
    history?: EditorHistoryHandle;
    saveLabel?: string;
    saveSavingLabel?: string;
    revertLabel?: string;
    revertTitle?: string;
    revertIcon?: string | null;
    revertRequiresDirty?: boolean;
    dirtyLabel?: string;
    showDirtyIndicator?: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `isDirty` | `boolean` | yes | - |
| `autosave` | `boolean` | no | Hide explicit persistence chrome while retaining history controls. |
| `saving` | `boolean` | no | - |
| `onSave` | `() => void &#124; Promise<void>` | yes | - |
| `onFinalize` | `() => Promise<boolean>` | no | Await autosave finalization before replacing the current document. |
| `onRevert` | `() => void` | no | - |
| `history` | [`EditorHistoryHandle`](EditorHistoryHandle.md) | no | - |
| `saveLabel` | `string` | no | - |
| `saveSavingLabel` | `string` | no | - |
| `revertLabel` | `string` | no | - |
| `revertTitle` | `string` | no | - |
| `revertIcon` | `string &#124; null` | no | - |
| `revertRequiresDirty` | `boolean` | no | When false, Revert/Cancel stays enabled while clean (e.g. exit edit mode). Default true. |
| `dirtyLabel` | `string` | no | - |
| `showDirtyIndicator` | `boolean` | no | - |
