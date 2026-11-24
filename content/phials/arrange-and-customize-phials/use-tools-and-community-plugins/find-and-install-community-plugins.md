---
title: "Find and install community plugins"
description: "Review optional plugins, install one you trust, and decide what it can access."
icon: phoundry-mono:settings
order: 4
ai_disclosure: true
---

# Find and install community plugins

**Community plugins** are optional add-ons created outside Phials. They can contribute file views, file handling, panels, and commands. You can also [browse community themes](../change-appearance/find-and-install-community-themes.md) in Appearance settings.

Community plugins are available on desktop. **Community plugins safe mode** is on by default and prevents third-party code from loading, being installed, or being updated.

## Decide whether to turn off safe mode

Enabling a community plugin lets its author’s code run inside Phials. The permission prompt describes access the plugin requests through Phials, and the plugin may still be able to contact websites or services on its own.

Before turning off safe mode, make sure you trust the plugins you plan to enable and their authors.

1. Open **Settings**.
2. Under **Plugins**, choose **Installed & Community**.
3. Turn **Community plugins safe mode** off.
4. Read **Turn off community plugins safe mode?**, then choose **I understand, turn off safe mode** only if you accept the boundary above.

## Find and install a plugin

1. Choose the **Community** tab.
2. Search by name, identifier, or author. Choose **Refresh** to reload the list.
3. Open the plugin’s card to see more about it. Use **Repository** or **Release** to review the project and the version you’re about to install.
4. Choose **Install**.

Installation downloads the latest compatible release but does not run it. The plugin moves to the **Installed** tab and normally remains disabled.

## Enable the installed plugin

1. Choose the **Installed** tab.
2. Find the plugin. Its card shows the installed version and requested-permission count.
3. Choose **Enable**.
4. If **Permission Request** appears, compare every requested action with the plugin's stated purpose. Choose **Allow & Enable** only when each request makes sense; choose **Deny** to leave the plugin disabled.

Permissions can include reading, writing, or deleting files, using the clipboard, contacting websites and services, or running a program on your desktop. A plugin with no requested permissions enables without that prompt.

After enabling succeeds, its additions become available immediately. If its card shows **Activation failed**, the plugin remains unavailable; see [Manage community plugins safely](./manage-community-plugins-safely.md) before retrying.
