---
title: "ThumbnailContentSnapshot"
description: "TypeScript signature and members for the ThumbnailContentSnapshot public SDK declaration."
ai_disclosure: true
order: 137
aliases:
  - references/ThumbnailContentSnapshot
---

# ThumbnailContentSnapshot

**Since Plugin API:** `2.0.0`

Read-only access uses the owning Plugin's existing Host admission and permissions.

## Signature

```typescript
interface ThumbnailContentSnapshot {
    readonly size: number;
    readonly sourceRevision: string;
    readRange(offset: number, length: number): Promise<Uint8Array>;
    close(): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `size` | `number` | yes | Size and filesystem observation revision belong to the granted bytes. |
| `sourceRevision` | `string` | yes | - |
| `readRange` | `(offset: number, length: number) => Promise<Uint8Array>` | yes | A bounded window of one pinned source; offsets and length are bytes. |
| `close` | `() => Promise<void>` | yes | Idempotent; the framework also releases this resource when rendering ends. |
