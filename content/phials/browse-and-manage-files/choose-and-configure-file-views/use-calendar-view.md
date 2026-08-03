---
title: "Use Calendar view"
description: "Place files on a calendar by a built-in or custom date and reschedule editable dates."
icon: phoundry-mono:folder
order: 5
ai_disclosure: true
---

# Use Calendar view

Calendar view arranges files by a date. Use it to review when files were created or modified, or to schedule Workspace Folder files with a custom date property.

Open **Configure view** in the toolbar, choose **View mode**, then choose **Calendar**.

## Choose the date source

Use the date-source menu at the left of the Calendar toolbar. You can choose:

- **Created** or **Modified** for dates supplied by the file system.
- Any Date property in the current Workspace Folder.

Outside a Workspace Folder, Calendar starts with Modified. Inside a Workspace Folder, it starts with the first available Date property, or Modified when none exists.

Created and Modified are read-only. A Workspace Folder Date property can be changed from Calendar view.

## Change the calendar range

Use the scope menu at the right of the Calendar toolbar:

- **Year** shows all twelve months with file counts. Choose a month to open it.
- **Month** shows a conventional month grid.
- **Week** shows seven days.
- **3-Day** shows the day before, the selected day, and the day after on a time grid.
- **Day** shows one day on a time grid.

Use **Previous** and **Next** to move by the selected scope. Choose **Today** to return to the current date. The range label in the center confirms the dates being shown.

## Work with dates and times

Month and Week place files on their dates as cards. Day and 3-Day separate date-only files into an all-day area and place files with times on an hourly grid. Times outside the main daytime range remain available in earlier or later bands.

When the date source is a Workspace Folder Date property, drag a file to another date to reschedule it. In Day and 3-Day, timed drops snap to 15-minute intervals. Dropping a timed file into an all-day area removes its time while keeping the date.

Dragging is unavailable for Created and Modified because those dates come from the file system.

## Find or clear missing dates

Choose **No date** to open a panel containing files that have no value for the selected date source. The button includes the number of files when any are missing a date.

For an editable Workspace Folder Date property:

- Drag a file from **No date** onto the calendar to assign a date.
- Drag a scheduled file into **No date** to clear its date.

Search, filters, sorting, and app-wide file visibility determine which files Calendar receives. For help narrowing them, see [Find and narrow files](../find-and-narrow-files/index.md).
