---
title: "ModalAPI"
description: "TypeScript signature and members for the ModalAPI public SDK declaration."
ai_disclosure: true
order: 51
aliases:
  - references/ModalAPI
---

# ModalAPI

**Since Plugin API:** `1.0.0`

Modal dialog API

## Signature

```typescript
interface ModalAPI {
    confirm(opts: {
        title: string;
        message: string;
        confirmLabel?: string;
        cancelLabel?: string;
        danger?: boolean;
    }): Promise<boolean>;
    prompt(opts: {
        title: string;
        message: string;
        defaultValue?: string;
        placeholder?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        validate?: (value: string) => string | null | undefined | Promise<string | null | undefined>;
    }): Promise<string | null>;
    alert(opts: {
        title: string;
        message: string;
    }): Promise<void>;
    choose<T extends string>(opts: {
        title: string;
        message: string;
        choices: Array<{
            id: T;
            label: string;
            description?: string;
            variant?: "primary" | "secondary" | "danger";
        }>;
        cancelLabel?: string;
    }): Promise<T | null>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `confirm` | `(opts: { … }) => Promise<boolean>` | yes | - |
| `prompt` | `(opts: { … }) => Promise<string &#124; null>` | yes | - |
| `alert` | `(opts: { … }) => Promise<void>` | yes | - |
| `choose` | `(opts: { … }) => Promise<T &#124; null>` | yes | - |
