---
title: "Add file-view configuration controls"
description: "Contributes view-specific Phoundry UI menu rows through getConfigurationItems."
ai_disclosure: true
order: 4
---

# Add file-view configuration controls

Use `getConfigurationItems` to add compact, view-specific controls to the Explorer's view configuration menu. Return Phoundry UI `MenuItem` values rather than rendering a separate popover.

Good configuration rows change how the current view is presented: card density, label placement, grouping, previews, or a small set of display modes. Plugin-wide credentials, accounts, and behavior belong in [plugin settings](../add-plugin-settings/index.md).

## Return Phoundry UI menu items

The provider receives the pane and a [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md) each time Phials builds the configuration menu:

```ts
import type { MenuItem } from "phoundry-ui";
import { PhiIcons } from "phoundry-ui/icons";
import ReviewCardsView from "./ReviewCardsView.svelte";

const configurationItems: FileBrowserViewProvider["getConfigurationItems"] =
  (pane, api) => {
    const compact = api.settings.get<boolean>("compactRows") ?? false;
    const labelPosition =
      api.settings.get<"below" | "beside">("labelPosition") ?? "below";

    return [
      {
        type: "boolean",
        id: "acme.review-cards.compact",
        label: "Compact cards",
        value: compact,
        preventClose: true,
        onchange: (next: boolean) => {
          void api.settings.set("compactRows", next);
        },
      },
      {
        type: "submenu",
        id: "acme.review-cards.label-position",
        label: "Label position",
        items: [
          {
            type: "action",
            id: "acme.review-cards.label-below",
            label: "Below preview",
            selected: labelPosition === "below",
            preventClose: true,
            action: () => {
              void api.settings.set("labelPosition", "below");
            },
          },
          {
            type: "action",
            id: "acme.review-cards.label-beside",
            label: "Beside preview",
            selected: labelPosition === "beside",
            preventClose: true,
            action: () => {
              void api.settings.set("labelPosition", "beside");
            },
          },
        ],
      },
    ];
  };

export const reviewCardsView: FileBrowserViewProvider = {
  type: "view",
  id: "acme.review-cards",
  name: "Review cards",
  priority: 100,
  icon: PhiIcons.document,
  component: ReviewCardsView,
  getConfigurationItems: configurationItems,
};
```

The IDs identify menu rows, not stored setting keys. Keep both stable and namespace the row IDs to the provider.

Use the standard Phoundry UI menu item types:

- `boolean` for an independent toggle or one selected choice
- `submenu` for a short set of related choices
- `group` to organize several related rows
- the standard command or action row for an immediate operation

Set `preventClose: true` when users are likely to compare the result while adjusting several options. Leave the menu free to close for choices that finish a short decision.

## Read effective options in the component

The component reads view options through its pane context:

```svelte
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const compact = $derived(
    pane.view.options.get<boolean>("compactRows") ?? false,
  );
  const labelPosition = $derived(
    pane.view.options.get<"below" | "beside">("labelPosition") ?? "below",
  );
</script>
```

`pane.view.options` resolves the value for this pane. If the pane has an active saved view, a saved-view override wins. Otherwise, the plugin setting is used. This keeps two panes free to use different saved-view presentations while preserving a sensible plugin-wide default.

The `api.settings` supplied to `getConfigurationItems` has the same effective scope. Writing through it updates the active saved-view override when one is active and the plugin default otherwise. The component reacts through `pane.view.options`.

Do not capture the [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md) or pane in long-lived global state. Treat the factory as a current snapshot and let Phials rebuild it when the pane, active saved view, or settings change.

## Keep controls focused

A configuration menu has limited space. Prefer:

- a small number of frequently adjusted choices
- labels that describe the visible result
- immediate application with no extra confirmation
- values that can be understood without documentation

Avoid:

- duplicating the global Settings window
- adding a control for every internal implementation detail
- destructive actions mixed into display choices
- custom HTML rows when a standard Phoundry UI menu item communicates the same control
- settings that silently change file contents

For example, “Preview: None / Image / Metadata” is a useful view choice. “Enable provider cache revalidation” is an implementation detail.

## Use the pane when availability depends on context

The factory can tailor choices to the current pane:

```ts
getConfigurationItems: (pane, api) => {
  const items: MenuItem[] = [
    createDensityItem(api),
  ];

  if (pane.workspaceFolder.active) {
    items.push(createGroupPropertyItem(pane, api));
  }

  return items;
}
```

Only omit a row when the capability truly does not apply. If an option is temporarily unavailable but still explains the view, a disabled row with a concise reason is usually clearer.

## Choose defaults deliberately

Every setting read by the menu or component needs a deterministic fallback:

```ts
const showLabels =
  api.settings.get<boolean>("showLabels") ?? true;
```

Use the same fallback in the component. Better still, centralize keys and defaults:

```ts
export const reviewViewOptions = {
  compactRows: {
    key: "compactRows",
    defaultValue: false,
  },
  labelPosition: {
    key: "labelPosition",
    defaultValue: "below" as const,
  },
};
```

This prevents the menu and renderer from disagreeing before a setting has been written.

## SDK reference

- [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md)
- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md)
