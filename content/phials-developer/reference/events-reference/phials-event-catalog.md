---
title: "Phials event catalog"
description: "Lists each supported host event, its typed payload, delivery conditions, ordering guarantees, and version boundary."
ai_disclosure: true
order: 1
---

# Phials event catalog

Phials owns every event ID beginning with `core.`. Plugins can subscribe to the
events in this catalog but cannot register or emit them.

All events on this page are available in Plugin API `1.0.0`. A plugin must also
set `minAppVersion` to the first Phials release in its test matrix that
implements every event behavior it uses.

## Catalog-wide guarantees

Unless an entry states a narrower rule:

- Phials emits after the described state transition has committed.
- A failed or cancelled operation emits nothing.
- Delivery occurs only in the current renderer session; events are not
  persisted, replayed, or sent to another window.
- Emissions from one publisher are delivered in publisher call order.
- Operations completing asynchronously are ordered by completion, not by
  initiation.
- Independent panes, tabs, files, and event IDs have no relative ordering
  guarantee.
- Repeated state changes can produce repeated events with equivalent payloads.
- A payload is the complete event-specific snapshot described by its entry, not
  permission to infer other app state.

Handler ordering and asynchronous completion are defined in the
[event delivery and cleanup reference](./event-delivery-and-cleanup-reference.md).

## Navigation and selection

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.navigation.changed` | `{ path: string; paneId: string }` | A pane commits a different browsed path and the new navigation state is ready. Refreshing the same path does not count as navigation. | Exactly once per successful path commit; ordered per `paneId`. |
| `core.selection.changed` | `{ paths: string[]; paneId: string }` | A pane commits a different file selection. `paths` is the complete deduplicated selection snapshot; an empty array means cleared selection. | Exactly once per logical selection commit; ordered per `paneId`. |

`path` and every entry in `paths` are absolute paths. A listener must use
`paneId` rather than assuming the active pane caused the event.

## Tabs

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.tab.created` | `{ tabId: string }` | A new tab has been created and can be addressed by its stable ID. | When creation also activates the tab, `created` precedes `switched`. |
| `core.tab.closed` | `{ tabId: string }` | A tab has been removed from the tab layout. | When closing the active tab selects a replacement, `closed` precedes `switched`. |
| `core.tab.switched` | `{ tabId: string; previousTabId: string }` | The active tab changes from one existing tab to another. | Ordered by committed active-tab changes. Both IDs identify the state transition; the event is not emitted for a no-op switch. |

Creating the first tab emits `core.tab.created`; it does not require a
`core.tab.switched` event because there is no previous tab.

## Files

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.file.created` | `{ path: string }` | A supported Phials operation creates a file and the created path is available. | After the filesystem commit and before any later open event for the same operation. |
| `core.file.opened` | `{ path: string }` | A supported file-open action successfully opens the file in its resolved destination. | After open succeeds; ordered by completed open actions. |
| `core.file.saved` | `{ path: string }` | A supported editor or Plugin API write durably saves file content. | After the write commits. A later save produces another event even when the path is unchanged. |
| `core.file.renamed` | `{ oldPath: string; newPath: string }` | A file rename commits and Phials reconciles the affected path state. | After commit; a multi-file rename emits one event per file in committed mapping order. |
| `core.file.deleted` | `{ paths: string[] }` | One supported operation moves or deletes one or more files and reconciles affected state. | One event per committed operation; `paths` preserves that operation's deterministic input order. |
| `core.file-note.saved` | `{ path: string; vialPath: string; hasNote: boolean }` | Persisted File Note content is created, updated, or removed for a file in a Workspace Folder. | After the note write commits. `hasNote` is false when the persisted content is empty after trimming. |

File events describe operations Phials owns or observes through a documented
public contract. They are not a complete operating-system filesystem watcher.
Directory operations use the separate directory events.

## Workspace Folder configuration and values

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.vial-page-config.changed` | `{ vialPath: string; page: VialPageConfig }` | The portable Page configuration for one Workspace Folder is persisted and adopted. | Ordered by successful configuration commits for `vialPath`. |
| `core.vial-values.changed` | `VialValuesChangedEvent` | Canonical Workspace Folder property values change, or a scoped compatibility refresh is required because exact cell deltas are unavailable. | Delta events follow committed mutation-version order. A batch publishes primary cells in commit order. |

`VialPageConfig` is:

```ts
interface VialPageConfig {
  propertyOrder?: string[];
  propertyVisibility?: Record<
    string,
    "always" | "not-empty" | "hidden"
  >;
  compactProperties?: boolean;
  fullWidth?: boolean;
}
```

`core.vial-values.changed` uses a discriminated union:

```ts
type VialValuesChangedEvent =
  | {
      kind: "delta";
      sourcePaneId: string;
      cell: VialCellDelta;
      dependentDeltas: VialCellDelta[];
    }
  | {
      kind: "refetch";
      sourcePaneId: string;
      vialId: string;
      vialPath: string;
      fileIds?: string[];
      filePaths?: string[];
      propertyIds?: string[];
      reason: "legacy" | "plugin" | "schema";
    };

interface VialCellDelta {
  vialId: string;
  vialPath: string;
  fileId: string;
  filePath: string;
  propertyId: string;
  operation: "set" | "clear" | "pending";
  value: PropertyValue | null;
  mutationVersion: number;
}
```

A `delta` contains one primary canonical cell and every dependent cell changed
by the same committed mutation. Apply the primary and dependent deltas as one
logical update. `mutationVersion` is monotonic within its Workspace Folder
mutation stream; a consumer must not replace newer cell state with an older
delta.

A `refetch` is an invalidation, not a value snapshot. The optional file and
property filters narrow the refresh. An omitted filter means every relevant
item in the stated Workspace Folder scope. `sourcePaneId` lets the initiating
pane avoid replaying work it has already applied.

`PropertyValue` is the public Workspace Folder property value shape supplied by
the synchronized SDK. Consumers must branch on the relevant property
definition rather than assuming every optional value field is present.

## Directories

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.directory.created` | `{ path: string }` | A supported Phials operation creates a directory and the created path is available. | After filesystem commit and affected-pane reconciliation. |
| `core.directory.renamed` | `{ oldPath: string; newPath: string }` | A directory rename commits and Phials reconciles affected paths. | After commit; a multi-directory rename emits one event per directory in committed mapping order. |
| `core.directory.deleted` | `{ path: string }` | A supported operation moves or deletes a directory and reconciles affected state. | After commit; batch operations preserve committed input order across emitted directory events. |
| `core.directory.changed` | `{ path: string; paneId: string }` | The listed contents of `path` change because entries were added, removed, or modified, and that pane adopts the refreshed listing. | Changes can be coalesced into one invalidation; ordered per `paneId` and `path`. |

`core.directory.changed` is a broad invalidation. Its payload does not identify
which children changed and does not imply recursive changes beneath `path`.

## Settings and known Workspace Folders

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.settings.changed` | `{ key: string; value: unknown }` | A public app setting commits a different value. | Ordered by successful setting commits. No event is emitted for a rejected write. |
| `core.known-vials.changed` | `{ paths: string[] }` | The known Workspace Folder list changes. `paths` is the complete presentation-order snapshot. | After the list is persisted and its derived indexes are invalidated. |
| `core.config.hidden-globs.changed` | `{ globs: string[] }` | Explorer always-hide globs are normalized, persisted, and adopted. | Ordered by committed configuration changes; `globs` is the complete current list. |

For `core.settings.changed`, `key` is a setting name exposed by the public SDK.
The `value` remains `unknown`; narrow it according to that setting's documented
type. An event does not expose undocumented configuration keys.

## Audio

| Event | Payload | Delivered when | Ordering |
| --- | --- | --- | --- |
| `core.audio.queue.changed` | `{ trackIds: string[]; length: number }` | The global audio queue membership or order changes. `trackIds` is the complete queue snapshot. | When one operation also changes the current track, `queue.changed` precedes `track.changed`. |
| `core.audio.track.changed` | `{ trackId: string \| null; path: string \| null; index: number }` | The current global audio track or its queue index changes. Null IDs and path with index `-1` mean there is no current track. | Ordered by committed current-track transitions. |
| `core.audio.playback.error` | `{ trackId: string \| null; message: string }` | Playback enters an error state because the current source cannot be loaded, decoded, or played. | Emitted after the error state commits. It does not imply a queue or track change. |

The queue and track events describe identity, not playback position, duration,
volume, pause state, or buffering progress.

## Drives and volumes

`core.drives.changed` has this payload:

```ts
{
  reason: "mounted" | "unmounted" | "changed" | "poll";
  platform: "macos" | "windows" | "linux" | "unknown";
}
```

Phials emits it after drive and volume discovery reports a possible change and
all active pane drive caches have finished refreshing. Notifications in one
discovery burst are coalesced; the payload is the last reason and platform in
that burst. The event is an invalidation signal, not a drive list. Read the
current list through the documented API after receiving it.

## Details column layout

`core.columns.layout.changed` has this payload:

```ts
interface ColumnLayoutChangedPayload {
  browsedPath: string;
  savedViewsCount: number;
  activeSavedViewId: string | null;
  columnConfig: DetailsViewColumnConfig[];
  calculationRowVisible: boolean;
  sourcePaneId: string;
}
```

Phials emits it after the source pane adopts a new Details column layout and
queues its path-owned or saved-view-owned persistence. It is the complete
live-sync snapshot for the affected `browsedPath`, not confirmation that an
asynchronous persistence write has completed.

`columnConfig` preserves display order and contains each column's stable ID,
visibility, width, order, frozen state, source, visibility source, calculation,
and wrapping choice as defined by `DetailsViewColumnConfig`.

Other panes apply the event only when their current path and saved-view scope
match. `sourcePaneId` prevents the source pane from replaying its own layout.
Events are ordered by source-pane layout commits; independent panes can publish
without a cross-pane ordering guarantee.

## Settled layout

`core.layout.settled` has this payload:

```ts
interface LayoutSettledPayload {
  reasons: Array<
    | "center-divider"
    | "center-structure"
    | "panel-resize"
    | "panel-structure"
    | "panel-transition"
    | "window-resize"
    | "window-restore"
  >;
  affectedIds: string[];
  timestamp: number;
}
```

Phials emits after shell-owned geometry changes have committed to the DOM and
the browser reaches the next layout frame. Requests in the same pending frame
are coalesced. `reasons` and `affectedIds` are de-duplicated in first-observed
order.

`affectedIds` narrows likely consumers when Phials can identify them; an empty
array means consumers must decide from `reasons`. `timestamp` is a monotonic
renderer timestamp in milliseconds, not wall-clock time.

The event signals that a consumer may measure its own local geometry. It does
not carry dimensions and does not guarantee that unrelated asynchronous content
has finished rendering.
