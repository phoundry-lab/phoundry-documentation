---
title: "Change keyboard shortcuts"
description: "Add, remove, or reset up to three keyboard shortcuts for a command and resolve invalid combinations."
icon: phoundry-mono:settings
order: 4
aliases:
  - customizing/keyboard-shortcuts
ai_disclosure: true
---

# Change keyboard shortcuts

Assign keyboard shortcuts to the commands you use most often, or remove a binding you do not want. Each command can have up to three active shortcuts.

## Find a command

1. Open Settings.
2. Under **Commands**, choose **Shortcuts**.
3. Enter the command name or part of its description in **Search shortcuts...**.

Phials groups commands into sections. The shortcut badges in each row show the current assignments, including your changes. Commands supplied by active community plugins can appear here too.

## Add or change a shortcut

1. Choose an existing shortcut badge to replace it, or choose the plus button after the current badges to add another.
2. Press the complete key combination you want to record.

Phials saves a valid combination immediately. Press Escape or choose **Cancel** to leave the existing assignment unchanged. Pressing a modifier key by itself does not create a shortcut.

On macOS, Settings presents Command, Option, Control, and Shift with macOS symbols. Windows uses names such as Ctrl, Alt, Shift, and Win; Linux uses Ctrl, Alt, Shift, and Super. Record the combination on the platform where you intend to use it.

## Resolve reserved or conflicting combinations

Phials does not accept operating-system combinations such as `Command+Q`, `Command+Tab`, `Alt+Tab`, or `Ctrl+Alt+Delete`. When the recorder reports that a combination is reserved, press another combination or cancel recording.

One shortcut cannot be assigned to two commands. If the recorder reports **Conflicts with** another action, choose **Try Again** and record a different combination. Phials leaves both existing assignments unchanged.

A valid shortcut runs only when its command applies to the active context. Most application shortcuts also stay inactive while you are typing in a text field or while a modal dialog is handling keyboard input.

## Remove or reset shortcuts

To remove one binding, point to its shortcut badge and choose **Remove shortcut**. Removing every badge leaves that command with no shortcut; it does not restore the factory assignment.

If you changed a command, choose **Reset to default** at the end of its row to restore that command's factory shortcuts. Use [Default keyboard shortcuts](../../reference/commands-and-keyboard-shortcuts/default-keyboard-shortcuts.md) when you need to look up those assignments.

**Reset All to Defaults** removes every custom shortcut assignment at once, and Phials does not provide an undo for that action. Choose it only when you want to restore the factory shortcut set for all commands.
