---
title: "Manage community plugins safely"
description: "Review permissions, control safe mode, update or disable plugins, and choose what an uninstall removes."
icon: phoundry-mono:settings
order: 5
ai_disclosure: true
---

# Manage community plugins safely

Control which community plugins may run and what remains when you disable, update, or uninstall one. Open **Settings**, then under **Plugins** choose **Community plugins** and use the **Installed** tab.

## Disable a plugin or return to safe mode

Choose **Disable** on a plugin's card to stop it without uninstalling it. Phials removes the plugin's active commands, panels, file handling, themes, and other additions immediately, but keeps its installed files and saved data so you can enable it again.

Turn **Community plugins safe mode** on when you want to stop all enabled community plugins and block registry browsing, installation, enabling, and updates. The change disables running community plugins immediately; it does not uninstall them or affect features that ship with Phials.

Turning safe mode off again does not automatically re-enable the plugins it stopped. Review the **Installed** tab and enable only the ones you still trust.

## Review permissions

The first time you enable a plugin that requests access, **Permission Request** lists every request and its risk. Allow only access that matches the plugin's purpose. Remember that these controls limit the official Phials interface available to the plugin; they do not make third-party code fully isolated from the app.

An update that changes the permission set disables the plugin and marks it **Permissions need review**. The current **Approve permissions** action does not show the changed list. Do not choose it until you have independently reviewed the new release and its manifest. After approval, choose **Enable** to run the plugin again.

## Update a plugin

1. With safe mode off, choose **Check updates**.
2. Review the source and release notes for any card marked with a newer version.
3. Choose **Update**.

If the permission set is unchanged, a plugin that was enabled is enabled again after the update. A plugin that was disabled stays disabled.

If activation fails, the card shows **Activation failed** and Phials attempts to restore the previous installed version. The plugin remains disabled. Review the displayed error and the release before choosing **Enable** to retry; leave it disabled or uninstall it if you no longer trust the package.

When an enabled plugin exposes its own preferences, choose **Settings** on its card. Phials opens the relevant Plugins category and selects that plugin.

## Uninstall a plugin

Uninstalling removes the plugin's code and active additions. Before choosing a data-removal option, decide whether you may reinstall it or need its saved state:

- **Uninstall - keep data** retains saved settings, storage, and other app-owned plugin data for a later reinstall.
- **Uninstall and delete data** removes the saved plugin data Phials can identify. This deletion cannot be undone.

Choose the uninstall button on the plugin's card, then choose the appropriate option in **Uninstall plugin?**. Neither choice deletes your ordinary files unless the plugin itself changed them while it was enabled.

For the initial trust and installation decision, see [Find and install community plugins](./find-and-install-community-plugins.md).
