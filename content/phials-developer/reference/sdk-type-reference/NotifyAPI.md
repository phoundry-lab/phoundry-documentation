---
title: "NotifyAPI"
description: "TypeScript signature and members for the NotifyAPI public SDK declaration."
ai_disclosure: true
order: 59
aliases:
  - references/NotifyAPI
---

# NotifyAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface NotifyAPI {
    info(message: string, options?: NotificationOptions): NotificationHandle;
    success(message: string, options?: NotificationOptions): NotificationHandle;
    warning(message: string, options?: NotificationOptions): NotificationHandle;
    error(message: string, options?: NotificationOptions): NotificationHandle;
    dismiss(id: string): void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `info` | `(message: string, options?: NotificationOptions) => NotificationHandle` | yes | - |
| `success` | `(message: string, options?: NotificationOptions) => NotificationHandle` | yes | - |
| `warning` | `(message: string, options?: NotificationOptions) => NotificationHandle` | yes | - |
| `error` | `(message: string, options?: NotificationOptions) => NotificationHandle` | yes | - |
| `dismiss` | `(id: string) => void` | yes | - |
