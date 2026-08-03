---
title: "ClipboardAPI"
description: "TypeScript signature and members for the ClipboardAPI public SDK declaration."
ai_disclosure: true
order: 2
aliases:
  - references/ClipboardAPI
---

# ClipboardAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface ClipboardAPI {
    writeText(text: string): Promise<void>;
    readText(): Promise<string>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `writeText` | `(text: string) => Promise<void>` | yes | - |
| `readText` | `() => Promise<string>` | yes | - |
