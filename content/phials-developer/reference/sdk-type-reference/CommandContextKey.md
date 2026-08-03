---
title: "CommandContextKey"
description: "TypeScript signature and members for the CommandContextKey public SDK declaration."
ai_disclosure: true
order: 6
aliases:
  - references/CommandContextKey
---

# CommandContextKey

**Since Plugin API:** `1.0.0`

Context keys for fast command filtering.
Commands declare which keys they require, and the CommandManager
maintains the current set of active keys based on app state.

## Signature

```typescript
type CommandContextKey = "hasSelection" | "hasSingleSelection" | "hasMultiSelection" | "selectionIsFile" | "selectionIsDirectory" | "selectionIsMixed" | "inVial" | "hasVialSelection" | "hasClipboard" | "clipboardIsCut" | "clipboardIsCopy" | "clipboardIsCopySymlink" | "canGoBack" | "canGoForward" | "always";
```

## Union members

- `hasSelection`
- `hasSingleSelection`
- `hasMultiSelection`
- `selectionIsFile`
- `selectionIsDirectory`
- `selectionIsMixed`
- `inVial`
- `hasVialSelection`
- `hasClipboard`
- `clipboardIsCut`
- `clipboardIsCopy`
- `clipboardIsCopySymlink`
- `canGoBack`
- `canGoForward`
- `always`
