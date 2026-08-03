---
title: "Find and install community plugins"
description: "Review and install optional community code after making an informed safe-mode choice."
icon: phoundry-mono:settings
order: 4
ai_disclosure: true
---

# Find and install community plugins

**Community plugins** are optional add-ons created outside Phials. They can contribute file views, file handling, panels, commands, themes, and other behavior.

Phials includes its normal features without community plugins. **Community plugins safe mode** is on by default and prevents third-party code from loading, being installed, or being updated.

## Decide whether to turn off safe mode

Community plugins run as trusted JavaScript in the same app environment as Phials. Permissions limit the official Phials functions a plugin can call, but they are not a complete sandbox. Plugin downloads also do not require a signature or checksum, and network permission does not prevent plugin code from attempting other direct network access.

Only turn safe mode off when you are willing to review and trust each plugin's author, source repository, release, and requested access.

1. Open **Settings**.
2. Under **Plugins**, choose **Community plugins**.
3. Turn **Community plugins safe mode** off.
4. Read **Turn off community plugins safe mode?**, then choose **I understand, turn off safe mode** only if you accept the boundary above.

## Find and install a plugin

1. Choose the **Community** tab.
2. Search by name, identifier, or author. Choose **Refresh** if the registry did not load or you want its latest entries.
3. Review the card's name, author, and description.
4. Independently inspect the named project's source and latest release before continuing. The current registry card does not show the repository link or requested permissions before installation.
5. Choose **Install**.

Installation downloads the latest compatible release but does not run it. The plugin moves to the **Installed** tab and normally remains disabled.

## Enable the installed plugin

1. Choose the **Installed** tab.
2. Find the plugin. Its card shows the installed version and requested-permission count.
3. Choose **Enable**.
4. If **Permission Request** appears, compare every requested action with the plugin's stated purpose. Choose **Allow & Enable** only when each request makes sense; choose **Deny** to leave the plugin disabled.

Permissions can include reading files, writing or deleting files, reading or writing the clipboard, and making network requests. A plugin with no requested permissions enables without that prompt.

After enabling succeeds, its additions become available immediately. If its card shows **Activation failed**, the plugin remains unavailable; see [Manage community plugins safely](./manage-community-plugins-safely.md) before retrying.
