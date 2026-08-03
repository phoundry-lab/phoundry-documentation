---
title: "Update or reset a saved view"
description: "Save deliberate changes to an active saved view, discard unsaved changes, and recognize state that updates automatically."
icon: phoundry-mono:vial
order: 2
ai_disclosure: true
---

# Update or reset a saved view

Update an active **saved view** when changes to its file-view configuration should become the version Phials restores next time. If the changes were temporary, revert to the stored configuration instead.

## Save deliberate configuration changes

Changes to the view mode, sorting, filtering, grouping, folder scope, item size, and Calendar date source or scale are explicit changes. When they differ from the active saved view, **Save view settings** and an adjacent revert button appear in the saved views bar. Their appearance is the unsaved-change indication for that view.

1. Activate the saved view you want to change.
2. Adjust the live file view. The controls themselves are covered in [Configure a file view](../../browse-and-manage-files/choose-and-configure-file-views/configure-a-file-view.md) and [Find and narrow files](../../browse-and-manage-files/find-and-narrow-files/index.md).
3. Choose **Save view settings**.

The button briefly changes to **Saved**. Phials also commits any Details column changes you made while the view was in this unsaved state. Switching away and back now restores the updated configuration.

Save before navigating to a folder with a different saved-view list. Explicit changes that you have not saved are not retained when the tab loads that folder's views.

## Revert unsaved changes

Choose the adjacent button whose tooltip is **Revert to saved view**. Phials restores the last saved configuration and column arrangement for the active view.

Reverting does not undo state that Phials saves automatically. The following changes normally update the active saved view without showing **Save view settings**:

- expanding or collapsing groups;
- ordinary Details column changes while the explicit configuration is otherwise clean;
- Compact rows and Calendar position or panel state; and
- saved-view-specific choices in **View options**.

Saved-view-specific options override the corresponding global option only for that view. Choose **Use global defaults** in **Configure view** to clear those overrides. The revert button does not clear them.

## When the folder has no saved views

Phials can show a live configuration without a saved view, but it does not offer **Save view settings** for that state. Choose **Create saved view** to retain the configuration. If the folder remains without saved views, Phials falls back to the configured folder defaults when it binds again; see [Choose new-tab and folder defaults](../../arrange-and-customize-phials/choose-default-behaviors/choose-new-tab-and-folder-defaults.md).
