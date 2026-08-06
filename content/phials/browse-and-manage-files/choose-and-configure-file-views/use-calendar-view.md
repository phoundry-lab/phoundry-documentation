---
title: "Use Calendar view"
description: "Place files on a calendar by a built-in or custom date and reschedule editable dates."
icon: phoundry-mono:folder
order: 6
ai_disclosure: true
---

# Use Calendar view

Calendar view arranges files and folders by a date. Use it to review when items were created or modified, or add the Workspace Folder's Calendar property to give every item one conventional schedule.

Open **Configure view** in the toolbar, choose **View mode**, then choose **Calendar**.

## Choose the date source

Use the date-source menu at the left of the Calendar toolbar. You can choose:

- The Workspace Folder's **Calendar** property, when present.
- **Created** or **Modified** for dates supplied by the file system.
- Any Date property or date-valued Formula in the current Workspace Folder.

Calendar starts with the Calendar property when one exists and falls back to Modified when it does not. Use **Add Calendar Property** in the Calendar toolbar to create it explicitly. A Workspace Folder can have one Calendar property and any number of ordinary Date properties. If Date properties already exist, creation can optionally copy values from one of them without changing or removing the original.

Created, Modified, and Formula sources are read-only. Calendar and ordinary Date properties can be changed from Calendar view. Deleting Calendar changes Calendar views that used it back to Modified; it does not silently recreate the property.

## Change the calendar range

Use the scope menu at the right of the Calendar toolbar:

- **Year** shows all twelve months with file counts. Choose a month to open it.
- **Month** shows a conventional month grid.
- **Week** shows seven days.
- **3-Day** shows the day before, the selected day, and the day after on a time grid.
- **Day** shows one day on a time grid.

Use **Previous** and **Next** to move by the selected scope. Choose **Today** to return to the current date. The range label in the center confirms the dates being shown.

## Work with dates and times

Month and Week place files and folders on their dates as cards. Day and 3-Day separate date-only items into an all-day area and place items with times on an hourly grid. Times outside the main daytime range remain available in earlier or later bands. Date ranges appear on every day they span.

Calendar date-only values are floating civil dates: June 5 remains June 5 when the computer's time zone changes. Calendar values with a time are absolute instants and display in the current local time zone.

When the date source is Calendar or a Workspace Folder Date property, drag an item to another date to reschedule it. In Day and 3-Day, timed drops snap to 15-minute intervals. Dropping a timed item into an all-day area removes its time while keeping the date. Rescheduling a range preserves its civil-day span for date-only values and elapsed duration for timed values.

Dragging is unavailable for Created and Modified because those dates come from the file system.

## Find or clear missing dates

Choose **No date** to open a panel containing files and folders that have no value for the selected date source. The button includes the number of items when any are missing a date.

For the Calendar property or an editable Workspace Folder Date property:

- Drag a file from **No date** onto the calendar to assign a date.
- Drag a scheduled file into **No date** to clear its date.

Search, filters, sorting, and app-wide file visibility determine which files Calendar receives. For help narrowing them, see [Find and narrow files](../find-and-narrow-files/index.md).
