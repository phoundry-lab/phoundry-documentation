---
title: "Use Explorer pane context"
description: "Uses the synchronized PluginPaneContext contract without depending on untyped host fields."
ai_disclosure: true
order: 2
---

# Use Explorer pane context

[PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md) represents one Explorer pane. Use it to read that pane's projected listing and to participate in its selection, navigation, view, and Workspace Folder behavior.

The pane supplied to a callback is authoritative. Code without a supplied pane can explicitly acquire one with `api.explorer.getActivePane()` or `getPane(id)`. Resolve it once before asynchronous work.

## Where pane context appears

Phials supplies [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md) through several public contracts:

| Contract | Meaning of `pane` |
| --- | --- |
| `FileBrowserViewProps.pane` | The pane rendering this file view |
| `FileBrowserViewProvider.getConfigurationItems(pane, api)` | The pane whose view menu is being built |
| Command and context-action context | The Explorer pane that qualified and invoked the action |
| `ModuleProviderProps.pane` | Optional Explorer context for a pane-aware panel or tab |

A command or context action can use its pane for the action it was asked to perform. A module's optional pane may be retained inspector context while a non-Explorer center tab is active. Treat that module context as presentation input, not proof that destructive Explorer commands are currently eligible.

Always handle the optional case in a module:

```svelte
<script lang="ts">
  let { pane }: ModuleProviderProps = $props();

  const selectedFile = $derived(pane?.selection.entries[0] ?? null);
</script>

{#if selectedFile}
  <p>Inspecting {selectedFile.name}</p>
{:else}
  <p>Select a file in Explorer</p>
{/if}
```

## Read the current projected listing

`pane.listing.entries` is the visible, ordered listing after Phials applies directory loading, search, filters, hidden-file rules, and sorting:

```ts
function summarizePane(pane: PluginPaneContext): {
  files: number;
  folders: number;
} {
  return pane.listing.entries.reduce(
    (summary, entry) => {
      if (entry.is_dir) {
        summary.folders += 1;
      } else {
        summary.files += 1;
      }
      return summary;
    },
    { files: 0, folders: 0 },
  );
}
```

Use this projection when the task concerns what the user currently sees. Use `api.files.readDirectory(path)` when the task explicitly needs a fresh directory read independent of the visible pane.

Do not sort, filter, or rescan the directory merely to recreate the pane's listing. A file-view component should render `pane.listing.entries` directly.

## Participate in selection

The selection API keeps selection consistent across every view:

```ts
pane.selection.set([file.path]);
pane.selection.clear();
pane.selection.selectAll();
```

Use `pane.selection.entries[0]` only when the action explicitly accepts the first selected entry. The API preserves both selected entries and normalized paths.

A file-view pointer handler can preserve platform selection behavior:

```ts
function selectEntry(pane: PluginPaneContext, file: FileEntry): void {
  pane.selection.set([file.path]);
}
```

Range selection uses the pane's complete listing and selection anchor. Do not calculate it from only mounted or virtualized rows.

## Open entries and navigate folders

Use `openPath()` for the pane's normal open behavior:

```ts
await pane.navigation.openPath(file.path);
```

Phials decides whether the entry navigates the pane, opens a file through its configured action, or crosses a Workspace Folder boundary. Use `navigateTo()` only for an explicit folder destination:

```ts
await pane.navigation.navigateTo(destinationPath);
```

Do not manipulate browser location, invoke an operating-system opener, or guess whether an entry should open as a file or folder.

When a contextual center-tab open should stay beside its originating Explorer, pass the pane ID to the typed modules API:

```ts
await api.modules.openCenter(
  "com.example.review-tools.module",
  { subjectPath: file.path },
  { sourcePaneId: pane.id },
);
```

The pane ID is a routing identity, not a path and not a stable replacement for pane-owned state.

## Read effective view and Workspace Folder state

The view scope exposes resolved pane presentation:

```ts
const itemSize = pane.view.itemSize;
const compact = pane.view.options.compactRows === true;
const sortedByStatus = pane.view.sorting.some(
  (sort) => sort.property === "com.example.review-tools:status",
);
```

File-view providers can read `pane.view.sorting` and `pane.view.columns` to render
the effective sort and column state. These readonly projections already include
pane persistence and active saved-view overrides; do not copy them into plugin
storage.

Use Workspace Folder context only for capabilities that need it:

```ts
const schema =
  pane.workspaceFolder
    ? await api.workspaceFolders.getSchema(pane.workspaceFolder.id)
    : null;
const hasReviewStatus = schema?.properties.some(
  (property) => property.id === "com.example.review-tools:status",
);
```

An ordinary folder has no active Workspace Folder property schema. Adapt or render a useful unavailable state rather than reading undocumented fields.

Protected Workspace Folder data is separate from arbitrary file bytes. Request
`workspace-folders.read` for known-folder summaries, schemas, values, tags,
ratings, and existing Page opening. Request only `workspace-folders.write` when
the plugin also mutates those values; write implies read.

```ts
const folders = await api.workspaceFolders.listKnown();
const current = pane.workspaceFolder;
if (current) {
  const schema = await api.workspaceFolders.getSchema(current.id);
  const subject: WorkspaceFolderFileRef = {
    workspaceFolderId: current.id,
    fileId,
  };
  await api.workspaceFolders.setPropertyValues(subject, [
    { propertyId: "rating", value: 4 },
  ]);
  await api.workspaceFolders.openPage(subject, { sourcePaneId: pane.id });
}
```

Retain `{ workspaceFolderId, fileId }` as identity. The path form is for a
single operation and is resolved once at its start. Opening an existing Page
requires read permission. Implicit Workspace Folder creation requires write
permission and an explicit `sourcePaneId`; Phials owns confirmation,
reconciliation, promotion, and opening.

## Treat the context as reactive and pane-owned

In a Svelte component, reads from `pane.listing`, `pane.selection`, `pane.navigation`, `pane.view`, and `pane.workspaceFolder` update as that pane changes. Derive visible state from those properties rather than copying it into a second long-lived model.

Two panes may show the same folder with different selection, sorting, item size, history, or saved-view state. Never key pane-owned UI solely by path.

Keep asynchronous work narrow:

1. Capture the stable values the operation needs, such as `pane.id` and a file path.
2. Await the operation.
3. Recheck current pane state before applying a result that depends on selection or navigation.

For the complete file-view workflow, see [Build file views](../../add-capabilities/build-file-views/index.md). Next, [read supported app settings](./read-phials-app-settings.md).
