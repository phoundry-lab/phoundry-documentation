---
title: "Add view columns and sorting"
description: "Defines custom view columns, value extraction, widths, and sortable behavior."
ai_disclosure: true
order: 3
---

# Add view columns and sorting

Declare `columns` when a file view presents comparable values in rows, lanes, or another column-like layout. Phials uses the definitions to identify sort fields and persist column state for the provider.

Do not add a column for every value your component happens to render. Declare values that users can reasonably compare, resize, show or hide, or sort.

## Define columns on the provider

```ts
import { PhiIcons } from "phoundry-ui/icons";
import ReviewTableView from "./ReviewTableView.svelte";

const reviewColumns: ViewColumnDefinition[] = [
  {
    id: "acme.category",
    label: "Category",
    width: 140,
    minWidth: 96,
    sortable: true,
    getValue: (file) => file.category ?? null,
  },
  {
    id: "acme.modified",
    label: "Modified",
    width: 180,
    minWidth: 136,
    sortable: true,
    getValue: (file) => file.modified ?? null,
  },
];

export const reviewTableView: FileBrowserViewProvider = {
  type: "view",
  id: "acme.review-table",
  name: "Review table",
  priority: 100,
  icon: PhiIcons.document,
  component: ReviewTableView,
  columns: reviewColumns,
};
```

Each column has:

| Field | Meaning |
| --- | --- |
| `id` | Stable identity used by sorting and persisted column state. Namespace it to your plugin. |
| `label` | User-facing column header. |
| `width` | Initial width in CSS pixels. |
| `minWidth` | Optional minimum resize width in CSS pixels. |
| `sortable` | Whether the column participates in the pane sort controls. |
| `getValue` | Pure, synchronous extraction of a string, number, or `null` from a file entry. |

Column IDs are durable. Renaming one discards the user's saved width, visibility, and sort references for that column.

## Keep extraction pure and cheap

`getValue` can run for every file when the listing changes or a user selects the column for sorting. It must not fetch data, write settings, or depend on component state.

Good extraction:

```ts
getValue: (file) => file.size ?? null
```

Avoid:

```ts
getValue: async (file) => fetchScore(file.path)
```

If a value needs parsing, metadata extraction, or another expensive operation, contribute it through the appropriate provider first and read the resolved value from [FileEntry](../../reference/sdk-type-reference/FileEntry.md). See [Extract file metadata](../extract-file-metadata/index.md).

Return one consistent value type per column. Mixing localized display strings, numbers, and missing values makes ordering hard to understand. Use `null` for missing values and format the extracted value separately when rendering it.

For dates, return a timestamp or another consistently sortable value:

```ts
getValue: (file) =>
  file.modified ?? null
```

Then format it in the component:

```ts
function formatModified(value: string | number | null) {
  return typeof value === "number"
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(value)
    : "—";
}
```

## Connect headers to pane sorting

Sorting belongs to the pane, not to the mounted rows. Ask the pane to toggle the provider column:

```svelte
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const files = $derived(pane.listing.entries);
  const columns = $derived(pane.view.columns.filter((column) => column.visible));
</script>

<div role="grid" aria-label="Review files">
  <div role="row" class="grid">
    {#each columns as column (column.id)}
      <div role="columnheader">{column.id}</div>
    {/each}
  </div>

  {#each files as file (file.path)}
    <div role="row" class="grid">
      <div role="gridcell">{file.name}</div>
    </div>
  {/each}
</div>
```

`pane.view.columns` exposes the pane's persisted visibility, order, and widths. `pane.view.sorting` describes the active ordered criteria, and Phials supplies a newly ordered `pane.listing.entries`.

Do not sort only the virtualized or mounted range. That produces incorrect results as soon as the user scrolls.

## Preserve useful widths

Choose an initial width that fits the common value, not the longest conceivable one. A practical column definition:

- leaves enough room for the label
- truncates unusually long values
- provides a minimum that keeps the value recognizable
- lets the file-name column absorb most flexible space

Phials persists user-resized widths by provider and column ID. The initial `width` is used when no persisted value exists.

## Sorting behavior

A sortable column should have an order users can predict:

- names use natural, locale-aware ordering
- numbers compare numerically
- timestamps compare chronologically
- missing values remain grouped consistently
- equal values preserve a deterministic file order

The host applies those rules to the primitive value returned by `getValue`.
Your component reads the resulting listing and `pane.view.sorting` to render
the host-owned current state.

For a board, calendar, or other view whose arrangement has meaning beyond sorting, declare only the columns that can safely reorder the underlying file sequence. Keep grouping or date placement as provider-specific view options instead.

## SDK reference

- [ViewColumnDefinition](../../reference/sdk-type-reference/ViewColumnDefinition.md)
- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md)
