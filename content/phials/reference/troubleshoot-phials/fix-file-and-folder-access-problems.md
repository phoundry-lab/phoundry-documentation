---
title: "Fix file and folder access problems"
description: "Restore access to missing, offline, protected, removable, cloud-backed, or network locations."
icon: phoundry-mono:sliders
order: 1
ai_disclosure: true
---

# Fix file and folder access problems

When an Explorer tab shows **Could not load this folder**, the underlying message distinguishes a missing path from an operating-system access failure. Make the location available before changing Phials settings or stored state.

## Retry the location

1. Run **Refresh** from the Path Bar or Command Bar.
2. If the error returns, open the same location in Finder on macOS, File Explorer on Windows, or your Linux file manager.
3. Follow the matching recovery below, then return to Phials and run **Refresh** again.

If the location opens in the native file manager but Phials still cannot read it, record the complete error shown in the Explorer tab. It usually identifies a permission or path problem that the operating system reported to Phials.

## Make an unavailable location available

| Location | What to check |
| --- | --- |
| Local folder | Confirm it was not renamed, moved, or deleted. Navigate to its new location instead of trying to repair the old path. |
| Removable drive or mounted disk image | Reconnect and unlock the device, then wait for the operating system to mount it before refreshing Phials. |
| Cloud-sync folder | Confirm the provider app is signed in and running. Make an online-only item available locally when Phials needs to read its contents or metadata. |
| SMB share | Confirm the server and share are reachable, then use the saved network location or reconnect with **Connect to Server**. |
| Protected folder | Check the account's filesystem permissions and any security policy that controls the folder. Do not run Phials as an administrator or as root to bypass the restriction. |

Phials discovers cloud-sync folders that already exist on the computer; the cloud provider controls downloads, account access, and sync status. See [Open drives, cloud storage, and Trash](../../browse-and-manage-files/navigate-locations/open-drives-cloud-storage-and-trash.md) for that boundary. For an SMB-specific failure, follow [Connect to a server](../../browse-and-manage-files/navigate-locations/connect-to-a-server.md).

## Allow protected locations on macOS

macOS may allow ordinary folders while denying protected locations such as parts of `~/Library` or `/Applications`. If only protected locations fail:

1. Open **System Settings**.
2. Choose **Privacy & Security**, then **Full Disk Access**.
3. Add or enable **Phials**.
4. Quit Phials completely and reopen it.
5. Return to the location and run **Refresh**.

Full Disk Access is a broad macOS permission. Enable it only when you want Phials to browse protected locations. The startup **Full Disk Access** prompt can open the correct System Settings page; choosing **Don't show again** suppresses only that reminder and does not change the operating-system permission. On macOS, Settings under **Developer** → **Debug** also lets you turn the reminder back on.

Windows and Linux do not use the macOS Full Disk Access control. Repair access through that platform's filesystem permissions, mount state, security software, or administrator-managed policy.

## Keep task-specific recovery with the location

An unavailable restored Explorer tab keeps its path so you can make the location available or close the tab. See [Close tabs and restore your session](../../browse-and-manage-files/work-with-explorer-tabs/close-tabs-and-restore-your-session.md).

If a locally stored Workspace Folder moved outside Phials, its data may still be intact in Phials Home even though its old content path is unavailable. Use **Locate Folder…** rather than resetting session data; see [Move or reconnect a Workspace Folder](../../organize-files-with-phials/use-workspace-folders/move-or-reconnect-a-workspace-folder.md).
