---
title: "Default keyboard shortcuts"
description: "Look up the factory keyboard shortcuts for shipped Phials commands on macOS, Windows, and Linux."
icon: phoundry-mono:sliders
order: 2
ai_disclosure: true
---

# Default keyboard shortcuts

These are the factory bindings for commands that ship with Phials. Your current bindings can differ after customization.

On macOS, `⌘` means Command, `⌥` means Option, `⌃` means Control, and `⇧` means Shift. Phials presents combined macOS modifiers in Control, Option, Shift, Command order. Windows uses Ctrl, Alt, Shift, and Win; Linux uses Ctrl, Alt, Shift, and Super. A plus sign joins named keys on Windows and Linux. Multiple shortcuts in one cell are alternatives.

## Application and window

| Command | macOS | Windows and Linux |
| --- | --- | --- |
| Open Command Bar | `⌘P` | `Ctrl+P` |
| Help | `F1` | `F1` |
| Settings | `⌘,` | `Ctrl+,` |
| Toggle Hidden Files | `⇧⌘.` | `Ctrl+H` |
| Toggle Left Panel | `⌘B` | `Ctrl+B` |
| Toggle Right Panel | `⇧⌘B` | `Ctrl+Shift+B` |
| Toggle Bottom Panel | `⌘J` | `Ctrl+J` |
| Refresh DOM | `⇧⌘R` | `Ctrl+Shift+R` |
| Zoom In | `⌘=` | `Ctrl+=` |
| Zoom Out | `⌘-` | `Ctrl+-` |
| Reset Zoom | `⌘0` | `Ctrl+0` |

## Tabs and tab groups

| Command | macOS | Windows and Linux |
| --- | --- | --- |
| New Tab | `⌘T` | `Ctrl+T` |
| Close Tab | `⌘W` | `Ctrl+W` |
| Next Tab | `⌃⇥` | `Ctrl+Tab` |
| Previous Tab | `⌃⇧⇥` | `Ctrl+Shift+Tab` |
| Move to New Group → Left | `⌥⇧⌘←` | `Ctrl+Alt+Shift+←` |
| Move to New Group → Right | `⌥⇧⌘→` | `Ctrl+Alt+Shift+→` |
| Move to New Group → Above | `⌥⇧⌘↑` | `Ctrl+Alt+Shift+↑` |
| Move to New Group → Below | `⌥⇧⌘↓` | `Ctrl+Alt+Shift+↓` |
| Switch to Tab 1 | `⌘1` | `Ctrl+1` |
| Switch to Tab 2 | `⌘2` | `Ctrl+2` |
| Switch to Tab 3 | `⌘3` | `Ctrl+3` |
| Switch to Tab 4 | `⌘4` | `Ctrl+4` |
| Switch to Tab 5 | `⌘5` | `Ctrl+5` |
| Switch to Tab 6 | `⌘6` | `Ctrl+6` |
| Switch to Tab 7 | `⌘7` | `Ctrl+7` |
| Switch to Tab 8 | `⌘8` | `Ctrl+8` |
| Switch to Tab 9 | `⌘9` | `Ctrl+9` |

The Next Tab and Previous Tab bindings use Control, not Command, on macOS.

## Navigation and search

| Command | macOS | Windows and Linux |
| --- | --- | --- |
| Go Back | `⌘[` | `Alt+←` |
| Go Forward | `⌘]` | `Alt+→` |
| Go Up | `⌘↑` | `Alt+↑` |
| Refresh | `⌘R` or `F5` | `Ctrl+R` or `F5` |
| Go to Home | `⇧⌘H` | `Alt+Home` |
| Go to Path... | `⌘G` | `Ctrl+G` |
| Focus search | `⌘F` | `Ctrl+F` |

**Go to Path...** is registered with this factory binding, but the current build does not yet open path entry when it runs.

## Selection, clipboard, and files

| Command | macOS | Windows and Linux |
| --- | --- | --- |
| Select All | `⌘A` | `Ctrl+A` |
| Cut | `⌘X` | `Ctrl+X` |
| Copy | `⌘C` | `Ctrl+C` |
| Paste | `⌘V` | `Ctrl+V` |
| Copy path / Copy Paths | `⇧⌘C` | `Ctrl+Shift+C` |
| Open | `↩` | `Enter` |
| Open in Finder / Open in File Explorer / Open in File Manager | `⇧⌘O` | `Ctrl+Shift+O` |
| Rename | `F2` | `F2` |
| Move to Trash | `⌘⌫` | `Delete` |
| Folder | `⇧⌘N` | `Ctrl+Shift+N` |

## Commands without factory bindings

The following runnable commands ship without a default keyboard shortcut:

| Category | Commands |
| --- | --- |
| Application and window | Toggle Parent Directory; Open config.toml; Reveal Phials home folder |
| Tabs | Duplicate Tab |
| Navigation and search | Search |
| Clipboard | Copy as symlink |
| Files and folders | Open in…; Pin to Favorites; Unpin from Favorites; Expand Archive; Compress; Flatten Directory; Flatten Directories |
| Create | Markdown File; Spreadsheet (CSV); Create Workspace Folder; New saved view |
| Properties | Text; Select; Multi-select; Tags; Status; Rating; URL; Date; Number; Checkbox; Relation; Rollup |
| File views | Details View; Thumbnails View; Masonry View; Column View; Boards View; Gallery View; Calendar View; Filter; Sort; Configure view |
| Workspaces and Pages | Refresh Workspaces; Open Page |
| Network folders | Connect to Server |

The **New**, **Add Property**, and **View Mode** rows organize child commands rather than running an action themselves, so they also have no binding.

In the current build, Settings registers commands that already have factory bindings. Commands in the unbound table do not appear in the Shortcuts editor unless their registration changes in a later release. To review current assignments, replace or remove bindings, or restore factory values, see [Change keyboard shortcuts](../../arrange-and-customize-phials/customize-commands-and-shortcuts/change-keyboard-shortcuts.md).
