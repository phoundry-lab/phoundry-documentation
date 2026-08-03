---
title: "Choose which properties appear on Pages"
description: "Set Page-specific property visibility, order, and compact presentation for a Workspace Folder."
icon: phoundry-mono:eye
order: 3
ai_disclosure: true
---

# Choose which properties appear on Pages

Choose which Workspace Folder properties a Page shows when you want the important fields easy to scan and less useful fields available only when needed. Page presentation is shared by every Page in one Workspace Folder and is independent of property columns or captions in file views.

Phials saves these choices with the Workspace Folder data. If you make the Workspace Folder portable, its Page presentation travels with it.

## Set a property's visibility

1. Open the Page panel or Page mode for a file in the Workspace Folder.
2. Choose the property name, then choose **Show on Page**.
3. Choose a visibility rule:

   - **Always show** keeps the property visible even when it has no value.
   - **Hide when empty** shows the property only when it has a value. New properties use this rule by default.
   - **Hidden** leaves the property out of the normal Page presentation even when it has a value.

**Hide when empty** recognizes each property's empty state. For example, blank text, no selected option, no date, an empty Relation, and an unrated Rating are empty. The number `0` and an off Checkbox are still values and remain visible.

These rules affect only Page presentation. They do not remove the property, clear its value, or change its visibility in Details, Grid, or another file view.

## Reveal suppressed properties temporarily

Choose **Show All** beneath the property block to reveal every property hidden from the current Page, including empty **Hide when empty** properties and properties set to **Hidden**. Choose **Show Less** to return to the saved rules.

Show All is temporary. It does not change visibility rules and resets when you select another file. The control appears only when at least one property is suppressed.

While all properties are visible, you can choose a hidden property's name and assign a different **Show on Page** rule. To change a value rather than its presentation, see [Set property values on files](../../organize-files-with-phials/describe-and-classify-files/set-property-values-on-files.md).

## Change property order

Drag a property by its name to place it where you want. You can also choose the name, then choose **Move up** or **Move down**.

The order applies to every Page in the Workspace Folder. It does not change the property's definition or its position in an Explorer file view. Choose **Show All** first when the property you need to move is suppressed.

## Use a compact property layout

Open the Page panel's tab menu, or choose **Page options** in Page mode, then turn on **Compact properties**. Properties become compact chips in a single horizontal row you can scroll, instead of labeled rows.

Compact properties applies to every Page in the Workspace Folder. It is separate from similarly named Grid, Calendar, and File-mode metadata settings.

Choosing **Show All** temporarily restores labeled rows so every property remains identifiable. Choosing **Show Less** restores the saved compact layout.

To add, rename, reconfigure, or delete a property, see [Add and configure properties](../../organize-files-with-phials/describe-and-classify-files/add-and-configure-properties.md).
