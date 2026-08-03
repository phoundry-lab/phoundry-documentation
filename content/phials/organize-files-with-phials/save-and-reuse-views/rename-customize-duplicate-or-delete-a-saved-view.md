---
title: "Rename, customize, duplicate, or delete a saved view"
description: "Rename or restyle a saved view, make an independent copy, or delete a definition safely."
icon: phoundry-mono:vial
order: 3
ai_disclosure: true
---

# Rename, customize, duplicate, or delete a saved view

Manage a **saved view** without changing the files it presents. The saved-view menu targets the chosen definition, so you can work with an inactive view without first applying it.

Open the menu by choosing the active saved-view pill or by right-clicking any visible saved-view pill. If the saved views strip has collapsed to a single dropdown, make the Explorer area wider until the pills return before opening the management menu.

## Rename the view or change its icon

The identity editor at the top of the menu contains the view's icon and name. It is also shown at the top of **Configure view** for the active saved view.

- Choose the icon to set a custom monochrome icon or clear it. With no custom icon, Phials uses the current view mode's icon.
- Edit the name, then press Enter or move focus away to save it. Press Escape to discard the draft.
- You can also choose **Rename view** to enter a new name in a separate prompt.

Names must contain text, but they do not have to be unique. If Phials cannot save an identity change, it restores the persisted value and shows **Could not save view**.

## Duplicate the view

1. Open the source view's menu and choose **Duplicate view**.
2. Keep or change the suggested name, which starts as the original name followed by `copy`.

Phials copies the complete saved definition, including its file-view configuration, automatically saved state, column arrangement, icon, and saved-view-specific options. The duplicate receives a new identity and remains inactive until you choose it. Later changes to either definition do not alter the other.

## Delete the view

Deleting removes the saved configuration immediately, and Phials does not provide an undo action. It does not delete or modify files in the folder.

Open the view's menu and choose **Delete view**. If you delete an inactive view, the active view stays selected. If you delete the active view, Phials activates the first remaining view. Deleting the final view returns the folder to its no-saved-view state and preserves that view's column arrangement as the folder's ordinary column layout.
