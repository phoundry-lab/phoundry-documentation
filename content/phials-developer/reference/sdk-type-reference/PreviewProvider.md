---
title: "PreviewProvider"
description: "TypeScript signature and members for the PreviewProvider public SDK declaration."
ai_disclosure: true
order: 111
aliases:
  - references/PreviewProvider
---

# PreviewProvider

**Since Plugin API:** `1.0.0`

Preview provider - renders file previews, thumbnails, and fullscreen views

## Signature

```typescript
interface PreviewProvider {
    type: "preview";
    id: string;
    name: string;
    priority?: number;
    extensions?: string[];
    mimeTypes?: string[];
    categories?: FileCategory[];
    canHandle?: (file: FileEntry, api: FileMatchAPI) => boolean;
    thumbnail?: import("svelte").Component<ThumbnailProviderProps>;
    surface?: import("svelte").Component<PreviewSurfaceProps>;
    createSession?: (props: PreviewSessionFactoryProps) => PreviewSession | Promise<PreviewSession>;
    toolbar?: import("svelte").Component<PreviewToolbarContributionProps>;
    destinations?: PreviewDestinationCapabilities;
    overridesDoubleClick?: boolean;
    isEditable?: (file: FileEntry, metadata?: FileMetadata) => boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"preview"` | yes | - |
| `id` | `string` | yes | - |
| `name` | `string` | yes | - |
| `priority` | `number` | no | - |
| `extensions` | `string[]` | no | File matching criteria |
| `mimeTypes` | `string[]` | no | - |
| `categories` | [`FileCategory`](FileCategory.md)`[]` | no | - |
| `canHandle` | `(file: `[`FileEntry`](FileEntry.md)`, api: `[`FileMatchAPI`](FileMatchAPI.md)`) => boolean` | no | - |
| `thumbnail` | `import("svelte").Component<`[`ThumbnailProviderProps`](ThumbnailProviderProps.md)`>` | no | Components |
| `surface` | `import("svelte").Component<`[`PreviewSurfaceProps`](PreviewSurfaceProps.md)`>` | no | Responsive file-specific viewer/editor used by every host destination. |
| `createSession` | `(props: `[`PreviewSessionFactoryProps`](PreviewSessionFactoryProps.md)`) => `[`PreviewSession`](PreviewSession.md)` &#124; Promise<`[`PreviewSession`](PreviewSession.md)`>` | no | - |
| `toolbar` | `import("svelte").Component<`[`PreviewToolbarContributionProps`](PreviewToolbarContributionProps.md)`>` | no | Single reactive provider control group mounted at the host toolbar's trailing edge. |
| `destinations` | [`PreviewDestinationCapabilities`](PreviewDestinationCapabilities.md) | no | - |
| `overridesDoubleClick` | `boolean` | no | Behavior |
| `isEditable` | `(file: `[`FileEntry`](FileEntry.md)`, metadata?: `[`FileMetadata`](FileMetadata.md)`) => boolean` | no | Preview can modify file contents; the host exposes editor chrome only when this returns true. |
