---
title: "MetadataAPI"
description: "TypeScript signature and members for the MetadataAPI public SDK declaration."
ai_disclosure: true
order: 45
aliases:
  - references/MetadataAPI
---

# MetadataAPI

**Since Plugin API:** `1.0.0`

Metadata API - extended API for metadata providers

**extends** [`PluginAPI`](PluginAPI.md)

## Signature

```typescript
interface MetadataAPI extends PluginAPI {
    readFile(): Promise<Uint8Array>;
    readTextFile(): Promise<string>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `readFile` | `() => Promise<Uint8Array>` | yes | Read the exact host-selected extraction target as bytes. |
| `readTextFile` | `() => Promise<string>` | yes | Read the exact host-selected extraction target as text. |
