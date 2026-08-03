---
title: "PreviewToolbarContributionProps"
description: "TypeScript signature and members for the PreviewToolbarContributionProps public SDK declaration."
ai_disclosure: true
order: 115
aliases:
  - references/PreviewToolbarContributionProps
---

# PreviewToolbarContributionProps

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PreviewToolbarContributionProps {
    file: FileEntry;
    api: PreviewAPI;
    session?: PreviewSession;
    destination: PreviewDestination;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | [`FileEntry`](FileEntry.md) | yes | - |
| `api` | [`PreviewAPI`](PreviewAPI.md) | yes | - |
| `session` | [`PreviewSession`](PreviewSession.md) | no | - |
| `destination` | [`PreviewDestination`](PreviewDestination.md) | yes | - |
