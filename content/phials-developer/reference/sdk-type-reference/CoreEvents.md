---
title: "CoreEvents"
description: "TypeScript signature and members for the CoreEvents public SDK declaration."
ai_disclosure: true
order: 14
aliases:
  - references/CoreEvents
---

# CoreEvents

**Since Plugin API:** `1.0.0`

Built-in core events (strongly typed)

## Signature

```typescript
interface CoreEvents {
    "core.navigation.changed": {
        path: string;
        paneId: string;
    };
    "core.selection.changed": {
        paths: string[];
        paneId: string;
    };
    "core.tab.created": {
        tabId: string;
    };
    "core.tab.closed": {
        tabId: string;
    };
    "core.tab.switched": {
        tabId: string;
        previousTabId: string;
    };
    "core.file.renamed": {
        oldPath: string;
        newPath: string;
    };
    "core.file.deleted": {
        paths: string[];
    };
    "core.file.saved": {
        path: string;
    };
    "core.file-note.saved": {
        path: string;
        vialPath: string;
        hasNote: boolean;
    };
    "core.vial-page-config.changed": {
        vialPath: string;
        page: VialPageConfig;
    };
    "core.vial-values.changed": VialValuesChangedEvent;
    "core.vial-formula-output-types.changed": {
        vialId?: string;
        vialPath: string;
        propertyIds: string[];
        savedViews: SavedVialView[];
        sourcePaneId: string;
    };
    "core.file.opened": {
        path: string;
    };
    "core.file.created": {
        path: string;
    };
    "core.directory.changed": {
        path: string;
        paneId: string;
    };
    "core.directory.renamed": {
        oldPath: string;
        newPath: string;
    };
    "core.directory.deleted": {
        path: string;
    };
    "core.directory.created": {
        path: string;
    };
    "core.settings.changed": {
        key: string;
        value: unknown;
    };
    "core.known-vials.changed": {
        paths: string[];
    };
    "core.config.hidden-globs.changed": {
        globs: string[];
    };
    "core.audio.track.changed": {
        trackId: string | null;
        path: string | null;
        index: number;
    };
    "core.audio.queue.changed": {
        trackIds: string[];
        length: number;
    };
    "core.audio.playback.error": {
        trackId: string | null;
        message: string;
    };
    "core.drives.changed": DrivesChangedPayload;
    "core.columns.layout.changed": ColumnLayoutChangedPayload;
    "core.layout.settled": LayoutSettledPayload;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `"core.navigation.changed"` | `{ … }` | yes | Pane navigation path changed |
| `"core.selection.changed"` | `{ … }` | yes | File selection changed in a pane |
| `"core.tab.created"` | `{ … }` | yes | New tab created |
| `"core.tab.closed"` | `{ … }` | yes | Tab closed |
| `"core.tab.switched"` | `{ … }` | yes | Active tab changed |
| `"core.file.renamed"` | `{ … }` | yes | File or directory renamed |
| `"core.file.deleted"` | `{ … }` | yes | Files deleted |
| `"core.file.saved"` | `{ … }` | yes | File saved |
| `"core.file-note.saved"` | `{ … }` | yes | Persisted File Note content was created, updated, or removed |
| `"core.vial-page-config.changed"` | `{ … }` | yes | Portable Page visibility/order changed for one Vial. |
| `"core.vial-values.changed"` | `VialValuesChangedEvent` | yes | Canonical cell deltas or a filtered compatibility refetch for one Vial. |
| `"core.vial-formula-output-types.changed"` | `{ … }` | yes | Formula output types changed; every pane must normalize its consumers. |
| `"core.file.opened"` | `{ … }` | yes | File opened |
| `"core.file.created"` | `{ … }` | yes | File created |
| `"core.directory.changed"` | `{ … }` | yes | Directory contents changed (files added/removed/modified) |
| `"core.directory.renamed"` | `{ … }` | yes | Directory renamed |
| `"core.directory.deleted"` | `{ … }` | yes | Directory deleted |
| `"core.directory.created"` | `{ … }` | yes | Directory created |
| `"core.settings.changed"` | `{ … }` | yes | App setting value changed |
| `"core.known-vials.changed"` | `{ … }` | yes | Known vials list changed (add/remove/rename in session) |
| `"core.config.hidden-globs.changed"` | `{ … }` | yes | Explorer always-hide globs changed |
| `"core.audio.track.changed"` | `{ … }` | yes | Global audio: current track or index changed |
| `"core.audio.queue.changed"` | `{ … }` | yes | Global audio: queue contents changed |
| `"core.audio.playback.error"` | `{ … }` | yes | Global audio: playback error (e.g. decode / missing file) |
| `"core.drives.changed"` | `DrivesChangedPayload` | yes | Drive/volume set may have changed (after pane drive caches refreshed) |
| `"core.columns.layout.changed"` | [`ColumnLayoutChangedPayload`](ColumnLayoutChangedPayload.md) | yes | Details column layout changed in a pane (path-owned or saved-view-owned) |
| `"core.layout.settled"` | [`LayoutSettledPayload`](LayoutSettledPayload.md) | yes | Shell-owned geometry changed and presented consumers may measure locally. |
