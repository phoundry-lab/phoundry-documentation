---
title: "Tag files across Workspace Folders"
description: "Assign shared tags, browse tagged files and mentions in the Property Browser, and change shared tags."
icon: phoundry-mono:vial
order: 5
ai_disclosure: true
---

# Tag files across Workspace Folders

Use **tags** to apply reusable labels to files and browse the same label across Workspace Folders known to Phials. Phials stores these tags with your Workspace Folder information.

## Add the Tags property

1. Browse a folder whose files you want to tag.
2. Choose **New** > **Add Property** > **Tags**.

Phials prepares Workspace Folder data if needed and adds the shared tag vocabulary. A Workspace Folder can have only one Tags property, so **Tags** becomes unavailable in the Add Property menu after you create it.

## Assign tags to a file

1. Choose the Tags value in Details, Grid, File, or Page.
2. Search for a tag and choose it. You can choose more than one.
3. To create a tag, enter its label and choose **Create \"label\"**.

Choose an assigned tag again to remove it from that file. Assignment changes save immediately and do not modify the file itself.

## Browse tags across Workspace Folders

Open the **Property Browser** panel and choose **Tags** to browse tags across Workspace Folders Phials knows about. Expand a tag to see its files and the Workspace Folder that owns each one.

- Choose a file to open its File presentation or reveal it in an Explorer tab when Phials does not have a suitable file presentation.
- Choose **Open Page** beside an indexed file to open its Page.
- A file with several tags appears under each matching label.
- Tags with exactly the same label merge into one group. Labels with different capitalization, such as `Design` and `design`, remain separate.

You can also find files and notes that [mention a tag](../../view-and-edit-files/edit-files-in-phials/edit-markdown-files.md#mention-a-tag). Switch to **Ratings** or **Calendar** in the same panel to browse rated or scheduled files.

## Rename or restyle a tag

Choose the Tags property name, choose **Configure property…**, then open the tag's overflow control. You can change its label, color, or icon.

A tag’s name, color, and icon are shared across the Workspace Folders Phials knows about on that computer. When you rename a tag, Phials also updates mentions it finds in those folders.

## Delete a tag everywhere

Deleting a tag removes it from the shared tag vocabulary and from every file using it in all known local Workspace Folders. This cannot be undone and does not delete the files themselves.

1. Open the tag's overflow control and choose **Delete option**.
2. Review the **Delete Tag** confirmation.
3. Choose **Delete Everywhere**.

If you need a label for only one Workspace Folder, use a [Multi-select property](./use-select-multi-select-and-status-properties.md) instead. Its options remain scoped to that property and folder.
